const express = require('express');
const adminController = require('../Controllers/admin-controller');
const imageuplode = require('../Middlewares/image-uplode');
const routers = express.Router();

routers.get('/products', adminController.getproducts);
routers.get('/products/new', adminController.getNewproducts);

routers.post('/products',imageuplode,adminController.CreateNewProducts)

module.exports = routers;