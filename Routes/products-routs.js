const express = require('express');
const ProductController = require('../Controllers/product-controller')

const routers = express.Router();

routers.get('/Products',ProductController.getAllProducts);
routers.get('/Products/:id',ProductController.getProductsById);

module.exports = routers;