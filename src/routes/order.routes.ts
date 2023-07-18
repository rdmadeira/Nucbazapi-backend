import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import {
  createOrder,
  getOrdersByUserIdController,
  getOrderByIdController,
  getOrderItemsById,
  putOrderUpdateController,
} from '../controllers/order.controller.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { body, param, query } from 'express-validator';

const router = Router();

// Toda validación de express-validator es para estar seguro de que todos los datos de OrderRequestDto están en el body. Así se evita entrar en el controller y activar el interactor sin los datos necesarios y generar un error allá.
router.post(
  '/',
  body('userId').isNumeric().notEmpty().withMessage('userId is required'),
  body('shippingDetails')
    .isObject()
    .withMessage('required shippingDetails type object'),
  body('items').isArray().withMessage('required items type array'),
  body('shippingPrice')
    .isNumeric()
    .notEmpty()
    .withMessage('shippingPrice has to be a number'),
  body('subtotal')
    .isNumeric()
    .notEmpty()
    .withMessage('subtotal has to be a number'),
  body('total').isNumeric().notEmpty().withMessage('total has to be a number'),
  validateRequest,
  verifyAuth,
  createOrder
); // Ruta con metodo post está protegida (si es de un user loggeado) y autorizada (si el user es de un Role admin) para admin!!

router.get(
  '/:userId',
  param('userId')
    .isNumeric()
    .notEmpty()
    .withMessage('userId has to be a number'),
  getOrdersByUserIdController
);

router.get(
  '/order/:orderId',
  /* query('orderId'), */
  param('orderId')
    .isString()
    .notEmpty()
    .withMessage('orderId has to be a string'),
  getOrderByIdController
);

router.get(
  '/order/:orderId/orderItems',
  /* query('orderId'), */
  param('orderId')
    .isString()
    .notEmpty()
    .withMessage('orderId has to be a string'),
  getOrderItemsById
);

router.put(
  '/:orderId',
  body('orderId').isString().notEmpty().withMessage('orderId is required'),
  body('merchant_order_id')
    .isString()
    .withMessage('merchant_order_id has to be a string'),
  body('payment_id').isString().withMessage('payment_id has to be a string'),
  body('status').isString().withMessage('status has to be a string'),
  validateRequest,
  verifyAuth,
  putOrderUpdateController
);

export default router;
