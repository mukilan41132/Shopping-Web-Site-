const Product = require('../Models/product-models');
function getproducts(req, res) {
    res.render('main/products/all-products');
}
function getNewproducts(req, res) {
    res.render('main/products/Add-newProducts')
}

async function CreateNewProducts(req, res, next) {
    const product = new Product({
        ...req.body,
        image: req.file.filename
    })
    try {
        await product.save();
    } catch (error) {
        next(error);
        return
    }
    res.redirect('/main/products');
}

module.exports = {
    getNewproducts: getNewproducts,
    getproducts: getproducts,
    CreateNewProducts: CreateNewProducts
}