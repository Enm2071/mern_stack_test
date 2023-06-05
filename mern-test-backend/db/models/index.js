const { UserModel, UserSchema } = require('./user.model');
const { ProductModel, ProductSchema } = require('./products.model');
const { RatingModel, RatingSchema } = require('./ratings.model');
const { OrderModel, OrderSchema } = require('./order.model');
const { OrderProductModel, OrderProductSchema } = require('./order-product.model');

const setupModels = (sequelize) => {
  UserModel.init(UserSchema, UserModel.config(sequelize));
  ProductModel.init(ProductSchema, ProductModel.config(sequelize));
  RatingModel.init(RatingSchema, RatingModel.config(sequelize));
  OrderModel.init(OrderSchema, OrderModel.config(sequelize));
  OrderProductModel.init(OrderProductSchema, OrderProductModel.config(sequelize));

  UserModel.associate(sequelize.models);
  RatingModel.associate(sequelize.models);
  ProductModel.associate(sequelize.models);
  OrderModel.associate(sequelize.models);
  OrderProductModel.associate(sequelize.models);
}

module.exports = {
  setupModels,
}
