const Product = require('../Models/product-models');

const Order = require('../Models/order-models')

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
        summary: req.body.Summary,
        description: req.body.Description,
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
        const productByid = await Product.findByProductId(req.params.id);
        res.render('main/products/Update-Products', { productByid: productByid });

    } catch (error) {
        next(error)
    }
}

async function UpdtateProductid(req, res, next) {


    const product = new Product({
        ...req.body,
        summary: req.body.Summary,
        description: req.body.Description,
        _id: req.params.id
    })

    if (req.file) {
        product.replaceImage(req.file.filename)
    }
    try {
        await product.save();
    } catch (error) {
        next(error);
        return
    }
    res.redirect('/main/products');
}
async function deleteProduct(req, res, next) {
    let product;
    try {
        product = await Product.findByProductId(req.params.id);
        await product.deletebyProductId();
    } catch (error) {
        return next(error);

    }
    res.json({ message: 'delete Product' })
}
async function getOrders(req, res, next) {
    try {
        const orders = await Order.findAll();
        res.render('main/orders/admin-orders', {
            orders: orders
        });
    } catch (error) {
        next(error);
    }
}

async function updateOrder(req, res, next) {
    const orderId = req.params.id;
    const newStatus = req.body.newStatus;

    try {
        const order = await Order.findById(orderId);

        order.status = newStatus;

        await order.save();

        res.json({ message: 'Order updated', newStatus: newStatus });
    } catch (error) {
        next(error);
    }
}
module.exports = {
    getNewproducts: getNewproducts,
    getproducts: getproducts,
    CreateNewProducts: CreateNewProducts,
    getUpdtateProductid: getUpdtateProductid,
    UpdtateProductid: UpdtateProductid,
    deleteProduct: deleteProduct,
    getOrders: getOrders,
    updateOrder: updateOrder
}