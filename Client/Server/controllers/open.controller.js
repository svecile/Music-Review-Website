const Song = require('../models/song.model');
const Review = require('../models/review.model');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const secret = 'hello'; //process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

exports.new_user = function (req, res) {
    let email = req.body.email; //user info from body
    console.log(`Creating user ${email}`);
    User.findOne({ email: req.body.email }, function (err, results) {
        if (results) {
            res.status(400).send(`Username ${req.body.email} not available`);
        } else if (err) {
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
                    console.log('User Created Sucessfully');

                    res.send('user created sucessfully')
                });

            });
        }
    });
};

exports.validate_user = function (req, res) {

    console.log(`Validating user ${req.body.email}`);

    User.findOne({ email: req.body.email }, function (err, results) {
        if (results == null) {
            res.status(401).send(`Access denied for ${req.body.email}, user does not exist`);
            console.log('User doesnt exist');

        } else if (results.deactivated == true) {
            res.status(401).send(`Access denied for ${req.body.email}, user account deactivated, please contact site admin`);
            console.log('User account deactivated');
        } else if (err) {
            return console.error(err);
        } else {
            bcrypt.compare(req.body.password, results.password, function (err, val) {
                if (val == true) {
                    var payload;
                    if (results.admin == true) {
                        payload = { username: req.body.email, admin: true };
                    }
                    payload = { username: req.body.email, admin: false }; // make up a payload for JWT
                    let token = jwt.sign(payload, secret);		// make a token
                    res.json(token);							// send it
                    console.log('token: ' + token);
                } else if (err) {
                    return console.error(err);
                } else {
                    res.status(401).send(`Access denied for ${req.body.email}`);
                    console.log('Hashes don\'t match');
                }
            });
        }
    });
};
//returns array of 10 songs ordered by average rating
exports.home_songs = function (req, res) {
    Song.find({}, ['title', 'artist', 'album', 'averageRating'],
        { sort: { averageRating: -1 }, limit: 10 }, function (err, songs) {

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
        if (err) return console.error(err);

        res.send(JSON.stringify(reviews));
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

