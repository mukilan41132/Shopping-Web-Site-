function protuctRouts(req, res, next) {
    if (!res.locals.isAuth) {
        return res.redirect('/402');
    }
    if (req.path.startsWith('/main') && !res.locals.isAdmin) {
        return res.redirect('/403')
    }
    next();
}

module.exports = protuctRouts;