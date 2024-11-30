function errorHandler(error, req, res, next) {
    console.log(error);

    res.status(500).render("shares/500")
}

module.exports = errorHandler;