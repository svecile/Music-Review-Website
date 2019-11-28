const Song = require('../models/song.model');
const Review = require('../models/review.model');

//create new song using data coming from a Put request
exports.song_create = function (req, res) {
    let song = new Song(
        {
            title: req.body.title,
            artist: req.body.artist,
            album: req.body.album,
            year: req.body.year,
            comment: req.body.comment,
            zeroByte: 0,
            track: req.body.track,
            genre: req.body.genre,
            submittedBy: req.body.submittedBy,
            numRatings:0,
            averageRating:0,
            hidden: false
        }
    );

    //save data to database
    song.save(function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('Song Created Sucessfully');
    });
};

//create new review using data coming from a Put request
exports.review_create = function (req, res) {
    let review = new Review(
        {
            song: req.body.song,
            rating: req.body.rating,
            review: req.body.review,
            submittedBy: req.body.user
        }
    );
    var numR;
    Song.update({ title: req.body.song }, { $inc: { numRatings: 1 }}, function (err) { //get all reviews for a song
        if (err) return console.error(err);    
    });

    //save data to database
    review.save(function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('Review Created Sucessfully');
        res.send('review created sucessfullty');
    });
};

//update existing song
exports.update_song = function (req, res) {
    const entries = Object.keys(req.body);
    const updates = {};

    // constructing dynamic query

    for (let i = 0; i < entries.length; i++) {
        updates[entries[i]] = Object.values(req.body)[i];
    }
    Song.update({title: req.body.title}, { $set: updates }, function (err) {
        if (err) throw (err);
        console.log("update sucessful");
    });
};