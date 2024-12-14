const product = require('../Models/product-models');
const Product = require('../Models/product-models');
async function getproducts(req, res, next) {
    try {
        const product = await Product.findAllProduct();

        res.render('main/products/all-products', { product: product });

    } catch (error) {
        next(error);
        return
    }
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
async function getUpdtateProductid(req, res, next) {
    try {
        const productByid = await product.findByProductId(req.params.id);
        console.log(productByid)
        res.render('main/products/Update-Products', { productByid: productByid });

    } catch (error) {
        next(error)
    }
}

async function UpdtateProductid(req, res) {

    res.redirect('/main/products/Update-Products');
}
module.exports = {
    getNewproducts: getNewproducts,
    getproducts: getproducts,
    CreateNewProducts: CreateNewProducts,
    getUpdtateProductid: getUpdtateProductid,
    UpdtateProductid: UpdtateProductid
}