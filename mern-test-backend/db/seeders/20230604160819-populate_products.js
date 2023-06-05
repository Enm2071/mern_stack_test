'use strict';

const axios = require('axios');
module.exports = {
  async up (queryInterface, Sequelize) {
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data;

    const promises = products.map(async (product) => {
      const rating = product.rating;
      const [ratingRecord] = await queryInterface.bulkInsert('ratings', [{
        ...rating,
        created_at: new Date(),
      }], { returning: true });

      product.rating_id = ratingRecord.id;
      product.created_at = new Date();
      delete product.rating;
      return queryInterface.bulkInsert('products', [product]);
    });

    return Promise.all(promises);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
    return queryInterface.bulkDelete('ratings', null, {});
  }
};
