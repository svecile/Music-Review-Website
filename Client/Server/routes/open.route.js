const express = require('express');
const oRouter = express.Router();
const open_controller = require('../controllers/open.controller');


oRouter.get('/songs', open_controller.home_songs); //return a list of 10 songs ordered by average rating. Optionally, you may pass a query parameter to indicate the number of results to return
oRouter.get('/search/:keyword', open_controller.soft_search); //return a list of songs matching the search criteria provided as query parameters
oRouter.get('/songReviewInfo/:songName', open_controller.song_review_details)//
oRouter.get('/reviews/:songName', open_controller.all_song_reviews); //return all reviews for a given song ID
oRouter.put('/new', open_controller.new_user);//create new user
oRouter.post('/validate', open_controller.validate_user);

module.exports = oRouter;