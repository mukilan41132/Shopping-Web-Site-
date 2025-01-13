const express = require('express');
const OrdersController = require('../Controllers/orders-controler');
const routers = express.Router();


routers.post('/',OrdersController.addOrder);
routers.get('/',OrdersController.getOrders);
routers.get('/success',OrdersController.getSuccess);
routers.get('/failure',OrdersController.getFailure);
module.exports = routers;