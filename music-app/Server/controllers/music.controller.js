const Product = require('../models/product.model');
const Song = require('../models/song.model');
const User = require('../models/user.model');
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

//get the average, most recent and total reviews for a song
exports.song_review_details = function (req, res) {
    review.find({ song: req.params.songName }, function (err, reviews) { //get all reviews for a song
        if (err) return console.error(err);

        var count = reviews.length(); //how many reviews there are
        console.log(count);
        var sum = 0;
        reviews.forEach(function (obj) {
            sum += parseFloat(obj[1]);
            i++;
        })
        var aveRating = sum / count;//average review
        console.log(aveRating);
        var recentReview;
        review.findOne({ song: req.params.name }, { //find most recent review for a song
            sort: { 'submittedOn': -1 }, function(err, review) {
                if (err) return console.error(err);

                recentReview=review;
            }
           
        })
        var json =[];
        json.push(recentReview);
        json.push({"numReviews":count, "aveRating":aveRating});
        res.send(json);
    });
};

//desplay details of a product ?name=harry+potter
exports.song_details = function (req, res) {
    Product.findOne({ name: req.params.name }, function (err, product) {
        if (err) return console.error(err);
        res.send(JSON.stringify(product));
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

//update product quantity or loan peroid
exports.product_updateLP_post = function (req, res) {
    Product.findOneAndUpdate({ name: req.body.name }, { loanPeroid: req.body.loanPeroid },
        function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('Product updated');
        });
};

//update product quantity or loan peroid
exports.product_updateQ_post = function (req, res) {
    Product.findOneAndUpdate({ name: req.body.name }, { quantity: req.body.quantity },
        function (err) {
            if (err) {
                return console.error(err);
            }
            console.log('Product updated');
        });
};

//delete product on post
exports.product_delete_post = function (req, res) {
    Product.findOneAndRemove({ name: req.body.name }, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('deleted sucessfully');
    });
};