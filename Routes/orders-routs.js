const express = require('express');
const OrdersController = require('../Controllers/orders-controler');
const routers = express.Router();


routers.post('/',OrdersController.addOrder);
routers.get('/',OrdersController.getOrders);

module.exports = routers;