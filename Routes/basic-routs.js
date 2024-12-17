const express = require('express');

const routers = express.Router();
routers.get('/', function (req, res) {
    res.redirect('/Products')
});

routers.get('/402', function (req, res) {
    res.render('Shares/402');
});
routers.get('/403', function (req, res) {
    res.render('Shares/403');
});


module.exports = routers;