const express = require('express');
const jwt = require('jsonwebtoken');

const UserService = require('../services/user.service');
const config = require('../config/config');
const router = express.Router();

const service = new UserService();

router.post('/sign-in',
  async (req, res, next) => {
    try {
      const { body: user } = req;
      delete user.password;
      const response = await service.getUserByEmail(user.email);
      const payload = {
        sub: user.id,
        role: user.role,
        user_id: response.id,
      };
      const token = jwt.sign(payload, config.jwtSecret, {
        expiresIn: '15min',
      });
      res.json({
        message: 'User logged in',
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
});

router.post('/sign-up',
  async (req, res, next) => {
    try {
      const { body: user } = req;
      await service.createUser(user);
      res.json({
        message: 'User created',
      });
    } catch (error) {
      next(error);
    }
  });

module.exports = router;
