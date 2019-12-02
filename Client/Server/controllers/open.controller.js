const Song = require('../models/song.model');
const Review = require('../models/review.model');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');
const Fuse = require('fuse.js');
const VerificationToken = require('../models/token.model');
const crypto=require('crypto');

exports.new_user = function (req, res) {
    let email = req.body.email;


    if (email == "") {
        res.json(JSON.stringify('Error you need to enter an email!'));
        return;
    } else if (req.body.password == "") {
        res.json(JSON.stringify('Error you need to enter a password!'));
        return;
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        res.json(JSON.stringify('Error email address is invalid please enter a valid email'));
        return;
    }

    console.log(`Creating user ${email}`);
    User.findOne({ email: req.body.email }, function (err, results) {
        if (results) {
            res.json(JSON.stringify(`Username ${req.body.email} not available`));
        } else if (err) {
            res.json(JSON.stringify('An error occured while creating your account'));
            return console.error(err);
        } else {

            bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

                if (err) return console.error(err);

                let user = new User(
                    {
                        email: req.body.email,
                        password: hash,
                        admin: false
                    }
                );

                //save data to database
                user.save(function (err) {
                    if (err) return console.error(err);

                    // Create a verification token for this user
                    let token = new VerificationToken(
                        {
                            _userId: user._id,
                            token: crypto.randomBytes(16).toString('hex')
                        }
                    );
                    token.save(function (err) {
                        if (err) return console.error(err);
                        
                        //create email for verification
                        var email = [
                            "From: no-reply@musicshareing.com", "To: "+ user.email, "Subject: Account Verification Token", 
                            "Body: Please verify your account by clicking the link: http://localhost:8081/api/public/confirmation/" + token.token 
                        ]

                        res.send(email);
                    });
                });
            });
        }
    });
};

//confirm email address
exports.email_confirmation = function (req, res) {

    // Find a matching token
    VerificationToken.findOne({ token: req.params.token }, function (err, token) {
        if (!token) return res.send(JSON.stringify('Error we are unable to find a valid token. Your token my have expired.'));
 
        // If a token is found, find a matching user
        User.findOne({ _id: token._userId}, function (err, user) {
            if (!user) return res.send(JSON.stringify('We were unable to find a user for this token'));
            if (user.isVerified) return res.send(JSON.stringify('This user has already been verified'));
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) return console.log(err);

                res.send(JSON.stringify("The account has been verified. You can now log in normally"));
            });
        });
    });
};


exports.validate_user = function (req, res) {

    //input validation, make sure an email, password have been entered and make sure the email is the correct format
    if (req.body.email == "") {
        res.json(JSON.stringify('Error you need to enter an email!'));
        return;
    } else if (req.body.password == "") {
        res.json(JSON.stringify('Error you need to enter a password!'));
        return;
    } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))) {
        res.json(JSON.stringify('Error email address is invalid please enter a valid email'));
        return;
    }

    console.log(`Validating user ${req.body.email}`);

    User.findOne({ email: req.body.email }, function (err, results) {
        if (results == null) {//if the email isnt found
            res.send(JSON.stringify(`Access denied for ${req.body.email}, user does not exist`));
            console.log('User doesnt exist');

        } else if (results.deactivated == true) {//if account is deactivated
            res.send(JSON.stringify(`Access denied for ${req.body.email}, user account deactivated, please contact site admin at admin@gmail.com`));
            console.log('User account deactivated');

        } else if (!results.isVerified) {//if the email hasnt been verified yet give them another chance to verify
            // Create a new verification token for this user since the old one may have expired
            let token = new VerificationToken(
                {
                    _userId: results._id,
                    token: crypto.randomBytes(16).toString('hex')
                }
            );
            token.save(function (err) {
                if (err) return console.error(err);
                
                //create email for verification
                var email = [
                    "Error email has not been validated yet please paste the link in the email below into your browser",
                    "From: no-reply@musicshareing.com", "To: "+ results.email, "Subject: Account Verification Token", 
                    "Body: Please verify your account by clicking the link: http://localhost:8081/api/public/confirmation/" + token.token 
                ]

                res.send(email);
            });
        } else if (err) {
            return console.error(err);

        } else {
            //check the password against the stored password
            bcrypt.compare(req.body.password, results.password, function (err, val) {
                var ad = false;

                if (val == true) {

                    var payload = { username: req.body.email, admin: false }; // make up a payload for JWT

                    if (results.admin == true) {//check if user account is an admin
                        payload = { username: req.body.email, admin: true };
                        ad = true; //variable to read on angular side to post an admin banner
                    }
                    let token = jwt.sign(payload, secret);		// make a token

                    var obj = ['Login Sucessful!', token, req.body.email, ad]
                   
                    res.json(obj);//send token

                } else if (err) {
                    return console.error(err);
                } else {
                    res.send(JSON.stringify(`Access denied for ${req.body.email} password is incorrect`));
                    console.log('Hashes don\'t match');
                }
            });
        }
    });
};
//returns array of 10 songs ordered by average rating
exports.home_songs = function (req, res) {
    Song.find({}, ['title', 'artist', 'album', 'numRatings', 'hidden'],
        { sort: { numRatings: -1 }, limit: 10 }, function (err, songs) {

            if (err) return console.error(err);
            else {
                res.json(songs);
            }
        });
};

//searches songs using fuse.js search so it ignores minor spelling mistakes, case, and whitespace
//also gives it a ranking for how much it matches your keyword(s)

exports.soft_search = function (req, res) {
    Song.find({}, function (err, songs) {
        if (err) return console.log(err);

        var options = {
            shouldSort: true,
            tokenize: true,
            findAllMatches: true,
            threshold: 0.3,
            location: 0,
            distance: 10,
            maxPatternLength: 32,
            minMatchCharLength: 4,
            keys: ["title", "artist", "album", "comment", "genre", "submittedBy"]
        };

        var fuse = new Fuse(songs, options);
        var result = fuse.search(req.params.keyword);

        res.send(result);
    })
}

//get all reviews for a song
exports.all_song_reviews = function (req, res) {
    Review.find({ song: req.params.songName }, function (err, reviews) { //get all reviews for a song
        if (err) {
            return console.error(err);
        }
        res.json(reviews);
    });
};

//get the average, most recent and total reviews for a song
exports.song_review_details = function (req, res) {

    Review.find({ song: req.params.songName }, null, { sort: { 'submittedOn': -1 } }, function (err, reviews) { //get all reviews for a song
        if (err) return console.error(err);

        var jsonStr = JSON.stringify(reviews);
        var jsonArr = JSON.parse(jsonStr);
        var count = Object.keys(jsonArr).length; //how many reviews there are

        var sum = 0;
        jsonArr.forEach(function (obj) {
            sum += parseFloat(obj.rating);
        })

        var aveRating = sum / count;//average review

        var json = [];
        json.push(jsonArr[0]);
        json.push({ "numReviews": count, "aveRating": aveRating });
        res.send(json);
    });
};


