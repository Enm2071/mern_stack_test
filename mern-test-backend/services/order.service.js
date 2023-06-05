const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {

  constructor() {
  }

  async findAll() {
    return await models.Order.findAll({
      include: [{
        model: models.User,
        as: 'user',
      }, {
        association: 'items',
      }]
    });
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        model: models.User,
        as: 'user',
      },
      {
        association: 'items',
      }]
    });

    if (!order) {
      throw boom.notFound('Order not found');
    }

    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$user.id$': userId
      },
      include: [{
        model: models.User,
        as: 'user',
      }, {
        association: 'items',
      }]
    });

    if (!orders) {
      throw boom.notFound('Orders not found');
    }

    return orders;
  }

  async create(data) {
    try {
      const newOrder = await models.Order.create({
        userId: data.userId
      });

      const promises = data.items.map(async (item) => {
        const orderItems = await models.OrderProduct.create({
          orderId: newOrder.id,
          ...item
        });
        return orderItems;
      });
      await Promise.all(promises);
      return newOrder;
    } catch (error) {

    }
  }

  async updateState(id, state) {
    const order = await this.findOne(id);
    if (!order) {
      throw boom.notFound('Order not found');
    }
    return await order.update({ state });
  }

}

module.exports = OrderService;
