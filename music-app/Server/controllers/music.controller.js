const Song = require('../models/song.model');
const Review = require('../models/review.model')

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
            submittedBy: req.body.submittedBy
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

    //save data to database
    review.save(function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('Review Created Sucessfully');
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
    Song.update({"title": req.body.title}, { $set: updates }, function (err) {
        if (err) throw (err);
        console.log("update sucessful");
    });
};