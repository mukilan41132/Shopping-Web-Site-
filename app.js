const express = require("express");
const path = require('path');
const authRouts = require('./Routes/auth-routes');
const AdminProductRouts = require('./Routes/admin-routs');
const productsRouts = require('./Routes/products-routs');
const baseRouts = require('./Routes/basic-routs');
const Mongodb = require('./DataBaseConnection/MongoDbConnection');
const csrf = require('csurf');
const ErrorHandler = require('./Middlewares/error-handler')
const CsrfToken = require('./Middlewares/csrf-token');
const expressSession = require('express-session')
const configsession = require('./Config/session')
const checkauth = require('./Middlewares/check-auth');
const protuctRouts = require('./Middlewares/routeprotection')
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use('/product/assets', express.static('product-data'));

app.use(express.urlencoded({ extended: false }));

const sessionConfig = configsession();

app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(CsrfToken);
app.use(checkauth);



app.use(baseRouts);
app.use(authRouts);
app.use(productsRouts);
app.use(protuctRouts)
app.use('/main', AdminProductRouts);

app.use(ErrorHandler);

Mongodb.MongodbConnection().then().catch(function (error) {
    console.log('connection fail');
    console.log(error);
})

app.listen(3000);