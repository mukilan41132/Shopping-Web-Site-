const product = require('../Models/product-models');

async function addCartItem(req, res) {
    let Product;
    try {
        Product = await product.findByProductId(req.body.productId)

    } catch (error) {
        next(error);
        return;
    }

    const cart = res.locals.cart;

    cart.addItems(Product);
    req.session.cart = cart;
    res.status(201).json({
        message: 'card Updated!',
        newTotalItems: cart.totalQuantity
    });
}

module.exports = {
    addCartItem: addCartItem
}