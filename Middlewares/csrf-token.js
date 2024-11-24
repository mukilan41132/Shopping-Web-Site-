function addCsrftoken(res, req, next) {
    res.locals.csrftoken = req.csrftoken();
    next();
}

module.exports = addCsrftoken;