import { Router } from 'express';
import {
  productsCreateController,
  productGetController,
  productsGetController,
  productsUpdateController,
  productsDeleteController,
} from '../controllers/products.controller.js';
import { authorizedAdmin, verifyAuth } from '../middlewares/auth.js';

const router = Router();

router
  .get('/:productId', productGetController)
  .put(
    '/product',
    verifyAuth,
    authorizedAdmin('admin'),
    productsUpdateController
  )
  .delete(
    'products/product',
    verifyAuth,
    authorizedAdmin('admin'),
    productsDeleteController
  );

router
  .get('/', productsGetController)
  .post('/', verifyAuth, authorizedAdmin('admin'), productsCreateController);

export default router;
