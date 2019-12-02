const express = require('express');
const aRouter = express.Router();
const admin_controller = require('../controllers/admin.controller');
const secret = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

//validate admin token that is attached to incoming request
validate_token = function (req, res, next) {

    //make sure there is an auth header
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
        //check if token is an admin token
        if (payload.admin) {
            console.log("JWT: ", JSON.stringify(payload));
            //if it is continue to the next function
            next();
        }
        else {
            return res.send(JSON.stringify("Access denied. Invalid token you are not an admin!"));
        }
    } catch (ex) {
        //if invalid token
        return res.send(JSON.stringify("Access denied. Invalid token."));
    }
};

aRouter.use(validate_token); //validate token everytime 

aRouter.post('/makeAdmin', admin_controller.set_admin);//make a user an admin
aRouter.post('/updateSongFlag', admin_controller.set_hidden_flag);//make a song hidden or visible
aRouter.post('/updateUserActivity', admin_controller.set_user_activity);//activate or deactivate a user account
aRouter.put('/newPPolicy', admin_controller.pPolicy_create); //create new privacy policy
aRouter.post('/updatePPolicy', admin_controller.update_pPolicy); //update pricavy policy
aRouter.put('/newPolicy', admin_controller.policy_create); //create new DMCA policy
aRouter.post('/updatePolicy', admin_controller.update_policy); //update DMCA policy
aRouter.put('/newRecord', admin_controller.new_record);//create a new infringement notice/takedown request/dispute claim record

module.exports = aRouter;