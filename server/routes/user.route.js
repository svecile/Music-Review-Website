const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user.controller');

//secure
router.put('/song/'); //save the JSON array for a song in the database and return the ID.
router.post('/song/:id'); //update the record of the given song ID with JSON array of properties sent in the body
router.put('/add-review/:id'); //Create a new review for the song with the given ID based on JSON array provided in the body

module.exports = router;