const express = require('express');
const CartController = require('../Controllers/Cart-controller');
const routers = express.Router();

routers.get('/',CartController.getCart);
routers.post('/items',CartController.addCartItem);

module.exports = routers;