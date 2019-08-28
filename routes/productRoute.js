import express from 'express';
import asyncMiddleware from '../middlewares/asyncMiddleware';
import * as productController from '../controllers/productController';
import * as commentController from '../controllers/commentController';

const router = express.Router();

router.get('', asyncMiddleware(productController.getProduct));
router.get('/:id', asyncMiddleware(productController.getProductById));
router.get('/:id/comments', asyncMiddleware(commentController.getProductComments));
router.post('/:id/comments', asyncMiddleware(commentController.addProductComments));

export default router;
