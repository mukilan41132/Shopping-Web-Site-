const express = require('express');

const routers = express.Router();
routers.get('/Products', function (req, res) {
    res.render('Customer/Products/all_product')
});



module.exports = routers;