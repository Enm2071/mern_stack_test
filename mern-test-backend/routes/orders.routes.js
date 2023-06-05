const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');

const {
  getOrderSchema,
} = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req;
      const orders = await service.findByUser(user.user_id);
      res.json({orders});
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json({
        order,
      });
    } catch (error) {
      next(error);
    }
  }
),

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { user, body } = req;
      const data = {
        userId: user.user_id,
        items: body,
      }
      const newOrder = await service.create(data);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id/state/:state',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const { id, state } = req.params;
      const order = await service.updateState(id, state);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
)

module.exports = router;
