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
router.post('/song/:id'); //update the record of the given song ID with JSON array of properties sent in the body
router.put('/secure/addReview', music_controller.review_create); //Create a new review for the song with the given ID based on JSON array provided in the body

//admin
router.post('/copyright/:id'); //Set or update copyright violation attributes for a given song ID. JSON array with new values is provided in the body
router.get('/copyright'); //Return all songs which are marked as copyright violations
router.post('/deactivate/:id'); //Set or clear “account deactivated” flag for a given user

/*function authenticate(req, res, next) {
	console.log('Data: ' + JSON.stringify(req.body));
	console.log("Auth: " + req.headers.authorization);
	// Extract token from Authorization header. It should be of the form "Bearer xxx.yyy.zzz"
	// Split on whitespace to get {"Bearer", "xxx.yyy.zzz"}

	if (typeof req.headers.authorization === 'undefined')
		return res.status(401).send("Access denied. Missing Auth header.");

	const token = req.headers.authorization.split(" ");
	if (! token[0].startsWith("Bearer")) { // Check first element. Must be "Bearer"
		return res.status(401).send("Access denied. Missing Token.");
	}

	try {
		// Verify the token
		const payload = jwt.verify(token[1], secret);
		console.log("JWT: ", JSON.stringify(payload));
		db.set(req.params.id, req.body); // save data with :id as the key
		res.send(JSON.stringify(req.body));	  
	  } catch (ex) {
		//if invalid token
		return res.status(400).send("Access denied. Invalid token.");
      }
    
      next();
};*/
module.exports = router;