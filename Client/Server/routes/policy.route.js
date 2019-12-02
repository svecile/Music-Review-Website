const express = require('express');
const pRouter = express.Router();
const policy_controller = require('../controllers/policy.controller');

pRouter.get('/getpPolicy', policy_controller.get_pPolicy); //get privacy policy
pRouter.get('/getPolicy', policy_controller.get_policy);//get DMCA policy

module.exports = pRouter;