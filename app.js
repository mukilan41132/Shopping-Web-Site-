const express = require("express");
const path = require('path');
const authRouts = require('./Routes/auth.routes')

const app = express();

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.use(authRouts);

app.listen(3000);