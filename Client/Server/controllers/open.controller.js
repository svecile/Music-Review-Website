const Song = require('../models/song.model');
const Review = require('../models/review.model');
const User = require('../models/user.model');
const PrivacyPolicy=require('../models/privacy.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

exports.new_user = function (req, res) {
    let email = req.body.email;

    if(email==""){
        res.json(JSON.stringify('Error you need to enter an email!'));
        return;
    }else if(req.body.password==""){
        res.json(JSON.stringify('Error you need to enter a password!'));
        return;
    }else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
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
                    if (err) {
                        return console.error(err);
                    }
                    res.json(JSON.stringify('User created sucessfully'));
                });
            });
        }
    });
};

exports.validate_user = function (req, res) {

    let email = req.body.email;

    if(email==""){
        res.json(JSON.stringify('Error you need to enter an email!'));
        return;
    }else if(req.body.password==""){
        res.json(JSON.stringify('Error you need to enter a password!'));
        return;
    }else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
        res.json(JSON.stringify('Error email address is invalid please enter a valid email'));
        return;
    }

    console.log(`Validating user ${req.body.email}`);

    User.findOne({ email: req.body.email }, function (err, results) {
        if (results == null) {
            res.send(JSON.stringify(`Access denied for ${req.body.email}, user does not exist`));
            console.log('User doesnt exist');

        } else if (results.deactivated == true) {
            res.send(JSON.stringify(`Access denied for ${req.body.email}, user account deactivated, please contact site admin at admin@gmail.com`));
            console.log('User account deactivated');
        } else if (err) {
            return console.error(err);
        } else {
            bcrypt.compare(req.body.password, results.password, function (err, val) {
                if (val == true) {
                    
                    var payload = { username: req.body.email, admin: false }; // make up a payload for JWT
                    
                    if (results.admin == true) {//check if user account is an admin
                        payload = { username: req.body.email, admin: true };
                    }
                    let token = jwt.sign(payload, secret);		// make a token
                    
                    var obj=[]
                    obj.push('Login Sucessful! ');
                    obj.push(token);
                    obj.push(req.body.email)
                    res.json(obj);							// send it
                    console.log('token: ' + token);
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

//searches songs using text search so it ignores minor spelling mistakes, case, and whitespace
//also gives it a ranking for how much it matches your keyword(s)
exports.search_songs = function (req, res) {
    Song.find({ $text: { $search: req.params.keyword } },
        { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } }).exec(function (err, songs) {

            if (err) return console.error(err);
            else {
                res.json(songs);
            }
        });
};

//get all reviews for a song
exports.all_song_reviews = function (req, res) {
    Review.find({ song: req.params.songName }, function (err, reviews) { //get all reviews for a song
        if (err){
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

exports.get_policy = function (req, res) {
    PrivacyPolicy.find({}, null, { sort: { submittedOn: -1 }, limit: 1 }, function (err, policy) { //get all reviews for a song
        if (err) return console.error(err);

        res.send(policy);
    });
};

