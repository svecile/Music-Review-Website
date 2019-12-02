const express = require('express');
const uRouter = express.Router();
const user_controller = require('../controllers/user.controller');
const secret = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

//validate to make sure person is a user or an admin
validate_token = function (req, res, next) {

    //make sure auth headers are included
    if (typeof req.headers.authorization === 'undefined') {
        return res.send(JSON.stringify("Access denied. Missing Auth header."));
    }
    const token = req.headers.authorization.split(" ");
    if (!token[0].startsWith("Bearer")) { // Check first element. Must be "Bearer"
        return res.send(JSON.stringify("Access denied. Missing Token."));
    }

    try {
        // Verify the token
        const payload = jwt.verify(token[1], secret);
        next();
    } catch (ex) {
        //if invalid token
        return res.send(JSON.stringify("Access denied. Invalid token."));
    }
};

uRouter.use(validate_token);

uRouter.put('/newSong', user_controller.song_create); //save the JSON array for a song in the database
uRouter.post('/updateSong', user_controller.update_song); //update the record of the given song 
uRouter.put('/addReview', user_controller.review_create); //Create a new review for the song with the given song based on JSON array provided in the body

module.exports = uRouter;