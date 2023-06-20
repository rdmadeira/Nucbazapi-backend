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
  .get('products/product', productGetController)
  .put(
    'products/product',
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
  .get('products', productsGetController)
  .post(
    'products',
    verifyAuth,
    authorizedAdmin('admin'),
    productsCreateController
  );
