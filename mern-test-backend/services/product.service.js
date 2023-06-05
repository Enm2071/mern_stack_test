const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize');

class ProductsServices {
  constructor() {
    this.products = [];
  }

  async getProducts() {
    try {
      const products = await models.Product.findAll({
        include: [{
          model: models.Rating,
          as: 'rating',
        }],
      });

      return products;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async getProduct(id) {
    try {
      const product = await models.Product.findOne({
        where: {
          id,
        }
      }, {
        include: ['category']
      });

      if (!product) {
        throw boom.notFound('Product not found');
      }
      return product;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async createProduct(product) {
    try {
      const category = await models.Category.findOne({
        where: {
          id: product.categoryId,
        },
      });

      if (!category) {
        throw boom.notFound('Category not found');
      }

      const productCreate = await models.Product.create(product);

      return productCreate;
    } catch (error) {
      throw boom.badRequest(error);
    }

  }

  async updateProduct(id, product) {
    try {
      const productToUpdate = await this.getProduct(id);

      await productToUpdate.update({
        ...product,
      });

      return productUpdate;

    } catch (error) {
      throw boom.badRequest(error);
    }
  }

  async patchProduct(id, product) {
    try {
      const productToUpdate = await this.getProduct(id);

      await productToUpdate.update({
        ...product,
      });

      return productUpdate;

    } catch (error) {
      throw boom.badRequest(error);
    }

  }

  async deleteProduct(id) {
    try {
      const productToDelete = await this.getProduct(id);

      await productToDelete.destroy();

      return productToDelete;
    } catch (error) {
      throw boom.badRequest(error);
    }
  }

}


module.exports = ProductsServices;
