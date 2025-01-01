const Product = require('../Models/product-models');

async function getAllProducts(req, res, next) {
    try {
        const product = await Product.findAllProduct();
        res.render('Customer/Products/all_product', { products: product });

    } catch (error) {
        next(error);
        return
    }

}


async function getProductsById(req, res, next) {
    try {
        const product = await Product.findByProductId(req.params.id);
        console.log("productid", product)
        res.render('Customer/Products/product-data', { product: product });

    } catch (error) {
        next(error);
        return
    }

}

module.exports = {
    getAllProducts: getAllProducts,
    getProductsById: getProductsById
}