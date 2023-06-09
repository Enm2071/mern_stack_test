const Joi = require('joi');

const id = Joi.number().integer().min(1);
const name = Joi.string().min(3).max(30);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10).max(100);
const image = Joi.string().uri();
const categoryId = Joi.number().integer().min(1);


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image,
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId,
});


const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
};
