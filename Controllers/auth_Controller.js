const Users = require("../Models/user_models");
const authentication = require('../Utils/authentication');
const validation = require('../Utils/Validation');
<<<<<<< HEAD
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



    if (!userDetailsValid || !emailCheckValid) {
        console.log("Validation failed!");
        SessionFlash.flashDataSession(req, {
            error: 'pls check input ',
            ...enteredData,
        }, function () {
            res.redirect('/signup');
        });
        return;
    }



=======


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

>>>>>>> 686eb2820472157af6ca1acd19cac1218fee34af
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
<<<<<<< HEAD
     
        if (existAlredy) {
            SessionFlash.flashDataSession(req, {
                error: 'User Already exist  ..  ',
                ...enteredData,
            }, function () {
                res.redirect('/signup');
            });
=======

        if(existAlredy){
            res.redirect('/signup');
>>>>>>> 686eb2820472157af6ca1acd19cac1218fee34af
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
<<<<<<< HEAD

function getLogin(req, res) {
    let sessionData = SessionFlash.getSessionData(req);
    if (!sessionData) {
        sessionData = {
            email: '',
            password: ''
        }
    }
    res.render('Customer/Auth/login', { inputdata: sessionData });
=======
function getLogin(req, res) {
    res.render('Customer/Auth/login');
>>>>>>> 686eb2820472157af6ca1acd19cac1218fee34af
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
<<<<<<< HEAD
    const sessionErrorData = {
        errorMessage: 'Invalid credencials-pls double check',
        email: users.email,
        password: users.password,
    }
    if (!existinguser) {
        SessionFlash.flashDataSession(req, sessionErrorData, function () {
            res.redirect('/login');
        })

=======
    if (!existinguser) {
        res.redirect('/login');
>>>>>>> 686eb2820472157af6ca1acd19cac1218fee34af
        return;
    }
    const existingpassword = await users.passwordValidation(existinguser.password);
    if (!existingpassword) {
<<<<<<< HEAD
        SessionFlash.flashDataSession(req, sessionErrorData, function () {
            res.redirect('/login');
        })
=======
        res.redirect('/login');
>>>>>>> 686eb2820472157af6ca1acd19cac1218fee34af
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