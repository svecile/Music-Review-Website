const express = require('express');
const aRouter = express.Router();
const admin_controller = require('../controllers/admin.controller');
const secret = 'hello'; //process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

validate_token = function (req, res, next) {
    console.log('Data: ' + JSON.stringify(req.body));
    console.log("Auth: " + req.headers.authorization);

    if (typeof req.headers.authorization === 'undefined') {
        return res.status(401).send("Access denied. Missing Auth header.");
    }
    const token = req.headers.authorization.split(" ");
    if (!token[0].startsWith("Bearer")) { // Check first element. Must be "Bearer"
        return res.status(401).send("Access denied. Missing Token.");
    }

    try {
        // Verify the token
        const payload = jwt.verify(token[1], secret);
        //check if token is an admin token
        if(payload.admin){
            console.log("JWT: ", JSON.stringify(payload)); 
            next();
        }
        else{
            return res.status(401).send("Access denied. Invalid token you are not an admin!");
        }
    } catch (ex) {
        //if invalid token
        return res.status(401).send("Access denied. Invalid token.");
    }
};

aRouter.use(validate_token); //validate token everytime 

aRouter.post('/admin/makeAdmin', admin_controller.set_admin);
aRouter.post('/admin/updateSongFlag', admin_controller.set_hidden_flag);
aRouter.post('/admin/updateUserActivity', admin_controller.set_user_activity);
//admin
aRouter.post('/admin/copyright/:id'); //Set or update copyright violation attributes for a given song ID. JSON array with new values is provided in the body
aRouter.get('/admin/copyright'); //Return all songs which are marked as copyright violations
aRouter.post('/admin/deactivate/:id'); //Set or clear “account deactivated” flag for a given user

module.exports = aRouter;