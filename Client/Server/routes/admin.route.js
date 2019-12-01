const express = require('express');
const aRouter = express.Router();
const admin_controller = require('../controllers/admin.controller');
const secret = process.env.JWT_KEY;
const jwt = require('jsonwebtoken');

validate_token = function (req, res, next) {
    console.log('Data: ' + JSON.stringify(req.body));
    console.log("Auth: " + req.headers.authorization);

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

aRouter.post('/makeAdmin', admin_controller.set_admin);
aRouter.post('/updateSongFlag', admin_controller.set_hidden_flag);
aRouter.post('/updateUserActivity', admin_controller.set_user_activity);
aRouter.post('/copyright/:id'); //Set or update copyright violation attributes for a given song ID. JSON array with new values is provided in the body
aRouter.get('/copyright'); //Return all songs which are marked as copyright violations
aRouter.post('/deactivate/:id'); //Set or clear “account deactivated” flag for a given user
aRouter.put('/newPPolicy', admin_controller.pPolicy_create); //create new policy
aRouter.post('/updatePPolicy', admin_controller.update_pPolicy); //update policy
aRouter.put('/newPolicy', admin_controller.policy_create); //create new policy
aRouter.post('/updatePolicy', admin_controller.update_policy); //update policy
aRouter.put('/newRecord', admin_controller.new_record);//create a new infringement notice/takedown request/dispute claim

module.exports = aRouter;