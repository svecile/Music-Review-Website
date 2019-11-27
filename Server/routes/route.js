const express = require('express');
const router = express.Router();
const music_controller = require('../controllers/music.controller');

//open
router.get('/songs', music_controller.home_songs); //return a list of 10 songs ordered by average rating. Optionally, you may pass a query parameter to indicate the number of results to return
router.get('/search/:keyword', music_controller.search_songs); //return a list of songs matching the search criteria provided as query parameters
router.get('/songReviewInfo/:songName', music_controller.song_review_details)//
router.get('/reviews/:songName', music_controller.all_song_reviews); //return all reviews for a given song ID
//secure
router.put('/secure/newSong', music_controller.song_create); //save the JSON array for a song in the database
router.post('/secure/updateSong', music_controller.update_song); //update the record of the given song ID with JSON array of properties sent in the body
router.put('/secure/addReview', music_controller.review_create); //Create a new review for the song with the given ID based on JSON array provided in the body

//admin
router.post('/copyright/:id'); //Set or update copyright violation attributes for a given song ID. JSON array with new values is provided in the body
router.get('/copyright'); //Return all songs which are marked as copyright violations
router.post('/deactivate/:id'); //Set or clear “account deactivated” flag for a given user


module.exports = router;