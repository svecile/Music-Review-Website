const express = require('express');
const oRouter = express.Router();
const open_controller = require('../controllers/open.controller');


oRouter.get('/songs', open_controller.home_songs); //return a list of 10 songs ordered by number of ratings
oRouter.get('/search/:keyword', open_controller.soft_search); //return a list of songs matching the search criteria provided as query parameters
oRouter.get('/songReviewInfo/:songName', open_controller.song_review_details)//get the average rating, number of ratings and most recent rating
oRouter.get('/reviews/:songName', open_controller.all_song_reviews); //return all reviews for a given song name
oRouter.put('/new', open_controller.new_user);//create new user
oRouter.post('/validate', open_controller.validate_user); //validate user thats logging in
oRouter.get('/confirmation/:token', open_controller.email_confirmation);//validate user email so they can login normally

module.exports = oRouter;