const express = require('express');
const authController = require('../Controllers/auth.Controller');
const routers = express.Router();

routers.get('/signup',authController.getSignup);
routers.get('/login',authController.getLogin);

module.exports = routers;