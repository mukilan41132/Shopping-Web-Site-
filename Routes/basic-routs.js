const express = require('express');

const routers = express.Router();
routers.get('/', function (req, res) {
    res.redirect('/Products')
});



module.exports = routers;