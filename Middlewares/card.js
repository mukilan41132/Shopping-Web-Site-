const Cart = require('../Models/card-models')
function initializeCart(req, res, next) {
    let cart;
    if (!req.session.cart) {
        cart = new Cart()
    } else {
        cart = new Cart(req.session.cart.items);
    }
    res.locals.cart = cart;

    next()
}

module.exports = initializeCart;