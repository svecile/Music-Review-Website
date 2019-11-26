const express = require('express');
const authRouter = express.Router();
const auth_controller = require('../controllers/auth.controller');

authRouter.put('/new', auth_controller.new_user);//create new user