import { Router } from 'express';
import { verifyAuth } from '../middlewares/auth.js';
import {
  createOrder,
  getOrdersByUserIdController,
} from '../controllers/order.controller.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { body, query } from 'express-validator';

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
  query('userId')
    .isNumeric()
    .notEmpty()
    .withMessage('userId has to be a number'),
  getOrdersByUserIdController
);

export default router;
