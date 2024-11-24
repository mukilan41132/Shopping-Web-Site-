const Users = require("../Models/user.models");

function getSignup(req, res) {
    res.render('Customer/Auth/signUp');
}

async function signup(req, res) {

    const users = new Users(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.address,
        req.body.postalcode,
        req.body.city
    )
    await users.Signup();
    res.redirect('/login')
}
function getLogin(req, res) {
    res.render('Customer/Auth/login');
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup
}