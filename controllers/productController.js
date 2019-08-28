import * as ProductModel from '../models/productModel';

const logger = require('../utils/logger')('logController');

const getProduct = async (req, res) => {
  logger.log('info', 'getProducts: %j', req.body);
  const products = await ProductModel.getRandomProducts();
  res.status(200).send({ payload: products || [] });
};

const getProductById = async (req, res) => {
  logger.log('info', 'getProductById: %j', req.body);
  const product = await ProductModel.getProductById(req.params.id);
  res.status(200).send({ payload: product });
};

export { getProduct, getProductById };
