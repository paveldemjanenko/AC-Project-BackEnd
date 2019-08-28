import * as CommentModel from '../models/commentModel';
import AppError from '../errors/AppError';

const logger = require('../utils/logger')('logController');

const getProductComments = async (req, res) => {
  logger.log('debug', 'getProductComments: %j', req.body);
  const comments = await CommentModel.getCommentsByProduct(req.params.id);
  res.status(200).send({ payload: { comments } });
};

const addProductComments = async (req, res) => {
  logger.log('debug', 'addProductComments: %j', req.body);
  const { user } = req;
  await CommentModel.save({
    message: req.body.text,
    // username: user.username,
    id: req.params.id,
  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  res.status(201).send();
};

export { getProductComments, addProductComments };