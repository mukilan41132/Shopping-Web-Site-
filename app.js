const express = require("express");
const path = require('path');
const authRouts = require('./Routes/auth.routes');
const Mongodb = require('./DataBaseConnection/MongoDbConnection');
const csrfAttack = require('csurf');
const ErrorHandler = require('./Middlewares/error-handler')
const CsrfToken = require('./Middlewares/csrf-token');
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

app.use(csrfAttack());

app.use(CsrfToken);

app.use(ErrorHandler);

app.use(authRouts);

Mongodb.MongodbConnection().then().catch(function (error) {
    console.log('connection fail');
    console.log(error);
})

app.listen(3000);