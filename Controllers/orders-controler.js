const Order = require('../Models/order-models');
const User = require('../Models/user_models');
const Stripe = require('stripe')
const APIKEY = `sk_test_51QggeWJRkkD2hVmv82a11uzwOTnzfEsJECyGbf2n1yiwkjgFmhqhk10gtE9exaz4glxTKcXydem1MKKOfPEi4Msq00a2z6JJdL`
const stripe = new Stripe(APIKEY, {
  apiVersion: '2024-12-18.acacia; custom_checkout_beta=v1',
});
async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render('Customer/orders/All-orders', {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  const cart = res.locals.cart;
  let userDocument;
  try {
    userDocument = await User.FindByid(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: cart.items.map(item => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.title,
          },
          unit_amount: +item.product.price.toFixed(2)*100,
        },
        quantity: item.quantity,
      }
    }),
    mode: 'payment',
    success_url: `http://localhost:3000/orders/success`,
    cancel_url: `http://localhost:3000/orders/failure`,
  });
  res.redirect(303, session.url)
}
function getSuccess(req, res) {
  res.render('Customer/orders/success')
}
function getFailure(req, res) {
  res.render('Customer/orders/failure')
}
module.exports = {
  addOrder: addOrder,
  getOrders: getOrders,
  getSuccess: getSuccess,
  getFailure: getFailure
};