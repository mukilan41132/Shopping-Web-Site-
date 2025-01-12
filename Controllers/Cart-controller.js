const product = require('../Models/product-models');

function getCart(req, res) {
    res.render('Customer/Cart/cart');
}
async function addCartItem(req, res) {
    let Product;
    try {
        Product = await product.findByProductId(req.body.productId)

    } catch (error) {
        next(error);
        return;
    }

    const cart = res.locals.cart;

    cart.addItem(Product);
    req.session.cart = cart;
    res.status(201).json({
        message: 'card Updated!',
        newTotalItems: cart.totalQuantity
    });
}
function updateCart(req, res) {
    const cart = res.locals.cart;
    const updatedItemdata = cart.UpdateItem(req.body.productId, req.body.quantity);
    req.session.cart = cart;
    
    res.status(201).json({
        message: 'item Updated!',
        updated: {
            totalQuantity: cart.totalQuantity,
            newtotalprice: cart.totalPrice,
            updatedItemPrice: updatedItemdata.updatedItemPrice
        }

    });
}
module.exports = {
    addCartItem: addCartItem,
    getCart: getCart,
    updateCart: updateCart
}