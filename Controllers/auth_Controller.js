const Users = require("../Models/user_models");
const authentication = require('../Utils/authentication');
const validation = require('../Utils/Validation');
const SessionFlash = require('../Utils/session-flash');

function getSignup(req, res) {
    let sessionData = SessionFlash.getSessionData(req);
    if (!sessionData) {

        sessionData = {
            email: '',
            ConfirmEmail: '',
            password: '',
            fullname: '',
            address: '',
            postalcode: '',
            city: ''
        }
    }

    res.render('Customer/Auth/signUp', { inputdatasignup: sessionData });
}

async function signup(req, res, next) {
    const enteredData = {
        email: req.body.email,
        ConfirmEmail: req.body.ConfirmEmail,
        password: req.body.password,
        fullname: req.body.fullname,
        address: req.body.address,
        postalcode: req.body.postalcode,
        city: req.body.city
    }
    const data = req.body;



    const userDetailsValid = validation.UserDetailsvalidation(
        data.email, data.password, data.fullname,
        data.address, data.postalcode, data.city
    );    // error need to clear later

    const emailCheckValid = validation.emailcheck(data.email, data.ConfirmEmail);



    if (!emailCheckValid) {
        console.log("Validation failed!");
        SessionFlash.flashDataSession(req, {
            error: 'pls check input ',
            ...enteredData,
        }, function () {
            res.redirect('/signup');
        });
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
     
        if (existAlredy) {
            SessionFlash.flashDataSession(req, {
                error: 'User Already exist  ..  ',
                ...enteredData,
            }, function () {
                res.redirect('/signup');
            });
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
    let sessionData = SessionFlash.getSessionData(req);
    if (!sessionData) {
        sessionData = {
            email: '',
            password: ''
        }
    }
    res.render('Customer/Auth/login', { inputdata: sessionData });
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
    const sessionErrorData = {
        errorMessage: 'Invalid credencials-pls double check',
        email: users.email,
        password: users.password,
    }
    if (!existinguser) {
        SessionFlash.flashDataSession(req, sessionErrorData, function () {
            res.redirect('/login');
        })

        return;
    }
    const existingpassword = await users.passwordValidation(existinguser.password);
    if (!existingpassword) {
        SessionFlash.flashDataSession(req, sessionErrorData, function () {
            res.redirect('/login');
        })
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