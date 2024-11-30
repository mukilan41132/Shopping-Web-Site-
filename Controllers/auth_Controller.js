const Users = require("../Models/user_models");
const authentication = require('../Utils/authentication');
const validation = require('../Utils/Validation');


function getSignup(req, res) {
    res.render('Customer/Auth/signUp');
}

async function signup(req, res) {

    if (!validation.UserDetailsvalidation(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.address,
        req.body.postalcode,
        req.body.city
    ) || validation.emailcheck(
        req.body.email, req.body.ConfirmEmail
    )
    ) {
        res.redirect('/signup');
        return;
    }

    const users = new Users(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.address,
        req.body.postalcode,
        req.body.city
    )

    try {
        const existAlredy = await users.existingemail();

        if(existAlredy){
            res.redirect('/signup');
            return;
        }
        await users.Signup();
    }
    catch (error) {
        next(error);
        return;
    }

    res.redirect('/login')
}
function getLogin(req, res) {
    res.render('Customer/Auth/login');
}
async function login(req, res) {

    const users = new Users(
        req.body.email,
        req.body.password,
    )
    let existinguser;

    try {
        existinguser = await users.EmailValidation();

    }
    catch (error) {
        next(error);
        return;
    }
    if (!existinguser) {
        res.redirect('/login');
        return;
    }
    const existingpassword = await users.passwordValidation(existinguser.password);
    if (!existingpassword) {
        res.redirect('/login');
        return;
    }
    authentication.createUserSession(req, existinguser, function () {
        res.redirect('/');
    })

}
function logout(req, res) {
    authentication.destroySessionAuth(req);
    res.redirect('/login')

}
module.exports = {
    getSignup: getSignup,
    getLogin: getLogin,
    signup: signup,
    login: login,
    logout: logout
}