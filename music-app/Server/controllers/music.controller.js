const Product = require('../models/product.model');
const Song = require('../models/song.model');
const User = require('../models/user.model');
const Review = require('../models/review.model')

//returns array of 10 songs ordered by average rating
exports.home_songs = function(req, res){
    Song.find({}, ['title', 'artist', 'album', 'averageRating'], 
        {sort:{averageRating: -1}, limit: 10}, function(err, products){

        if(err) return console.error(err);
        else{
            res.json(products);
        }   
    }); 
};

//desplay details of a product ?name=harry+potter
exports.product_details = function(req, res){
    Product.findOne({name: req.params.name}, function(err, product){
        if(err) return console.error(err);
        res.send(JSON.stringify(product));
    });
};

//create new product using data coming from a POST request
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

//update product quantity or loan peroid
exports.product_updateLP_post = function(req, res){
    Product.findOneAndUpdate({name: req.body.name}, {loanPeroid: req.body.loanPeroid},
        function (err){
            if (err){
                return console.error(err);
            }
            console.log('Product updated');
        });
};

//update product quantity or loan peroid
exports.product_updateQ_post = function(req, res){
    Product.findOneAndUpdate({name: req.body.name}, {quantity: req.body.quantity},
        function (err){
            if (err){
                return console.error(err);
            }
            console.log('Product updated');
        });
};

//delete product on post
exports.product_delete_post = function (req, res){
    Product.findOneAndRemove({name: req.body.name}, function(err){
        if(err){
            return console.error(err);
        }
        console.log('deleted sucessfully');
    });
};