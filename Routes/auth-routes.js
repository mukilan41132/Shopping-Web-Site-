const express = require('express');
const authController = require('../Controllers/auth_Controller');
const routers = express.Router();

routers.get('/signup',authController.getSignup);
routers.get('/login',authController.getLogin);
routers.post('/signup',authController.signup);
routers.post('/login',authController.login);
routers.post('/logout',authController.logout)


module.exports = routers;