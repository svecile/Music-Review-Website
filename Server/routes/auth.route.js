const express = require('express');
const authRouter = express.Router();
const auth_controller = require('../controllers/auth.controller');

authRouter.put('/new', auth_controller.new_user);//create new user
authRouter.post('/validate', auth_controller.validate_user);

authRouter.post('/makeAdmin', auth_controller.set_admin);
authRouter.post('/updateSongFlag', auth_controller.set_hidden_flag);
authRouter.post('/updateUserActivity', auth_controller.set_user_activity);

module.exports = authRouter;