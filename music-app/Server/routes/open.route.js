const express = require('express');
const router = express.Router();
const open_controller = require('../controllers/open.controller');

//open
router.get('/song'); //return a list of 10 songs ordered by average rating. Optionally, you may pass a query parameter to indicate the number of results to return
router.get('/search'); //return a list of songs matching the search criteria provided as query parameters
router.get('/reviews/:id'); //return all reviews for a given song ID

module.exports = router;