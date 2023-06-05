const productRouter = require('./products.routes');
const authRouter = require('./auth.routes');
const orderRouter = require('./orders.routes');

function routerApi(app) {
  app.use('/products', productRouter);
  app.use('/auth', authRouter);
  app.use('/orders', orderRouter);
}

module.exports = routerApi;
