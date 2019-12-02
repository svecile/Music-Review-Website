const Song = require('../models/song.model');
const Review = require('../models/review.model');

//create new song using data coming from a Put request
exports.song_create = function (req, res) {
    //make sure title and artist feilds are entered
    if (req.body.title == "" || req.body.artist == "") {
        res.send(JSON.stringify('Error title and artist feilds are required!'));
        return;
    }

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
            numRatings: 0,
            averageRating: 0,
            hidden: false
        }
    );

    //save data to database
    song.save(function (err) {
        if (err) {
            res.send(JSON.stringify('Error title and artist feilds are required'))
            return console.error(err);
        }
        res.send(JSON.stringify('Song Created Sucessfully'));
    });
};

//create new review using data coming from a Put request
exports.review_create = function (req, res) {
    let review = new Review(
        {
            song: req.body.song,
            rating: req.body.rating,
            review: req.body.review,
            submittedBy: req.body.submittedBy
        }
    );

    //save data to database
    review.save(function (err) {
        if (err) {
            res.send(JSON.stringify('Error rating and song name must be entered!'))
            return console.error(err);
        } else {
            console.log('Review Created Sucessfully');
            res.send(JSON.stringify('Review created sucessfullty'));
        }
    });

    //update the number of ratings for the cooresponding song
    Song.update({ title: req.body.song }, { $inc: { numRatings: 1 } }, function (err) {
        if (err) {
            res.send(JSON.stringify('Error song not found!'))
            return console.error(err);
        }
    });
};

//update existing song
exports.update_song = function (req, res) {
    const entries = Object.keys(req.body);
    const updates = {};

    // constructing dynamic query so any values can be updated
    for (let i = 0; i < entries.length; i++) {
        updates[entries[i]] = Object.values(req.body)[i];
    }
    Song.update({ title: req.body.title }, { $set: updates }, function (err) {
        if (err) throw (err);
        res.send(JSON.stringify("update sucessful"));
    });
};