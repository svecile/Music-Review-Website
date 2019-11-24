const express = require('express');
const router = express.Router();
const admin_controller = require('../controllers/admin.controller');

//admin
router.post('/copyright/:id'); //Set or update copyright violation attributes for a given song ID. JSON array with new values is provided in the body
router.get('/copyright'); //Return all songs which are marked as copyright violations
router.post('/deactivate/:id'); //Set or clear “account deactivated” flag for a given user

module.exports = router;