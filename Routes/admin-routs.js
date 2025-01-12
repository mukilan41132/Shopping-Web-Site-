const express = require('express');
const adminController = require('../Controllers/admin-controller');
const imageuplode = require('../Middlewares/image-uplode');
const routers = express.Router();

routers.get('/products', adminController.getproducts);
routers.get('/products/new', adminController.getNewproducts);

routers.post('/products', imageuplode, adminController.CreateNewProducts);
routers.get('/products/:id', adminController.getUpdtateProductid);
routers.post('/products/:id', imageuplode, adminController.UpdtateProductid);
routers.delete('/products/:id', adminController.deleteProduct);
routers.get('/orders', adminController.getOrders);

routers.patch('/orders/:id', adminController.updateOrder);

module.exports = routers;