const Cart = require('../Models/card-models')
function initializeCart(req, res, next) {
    let cart;
    if (!req.session.cart) {
        cart = new Cart()
    } else {
        const ses = req.session.cart
        cart = new Cart(ses.items, ses.totalQuantity, ses.totalPrice);
    }
    res.locals.cart = cart;

    next()
}

module.exports = initializeCart;