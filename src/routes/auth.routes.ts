import { Router } from 'express';
import {
  loginController,
  signinController,
} from '../controllers/auth.controller.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/signup',
  body('name').trim().notEmpty().withMessage('Nombre obligatório'),
  body('email').isEmail().withMessage('Ingrese un email válido'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Contraseña obligatória')
    .isLength({ min: 6 })
    .withMessage('Mínimo 6 caracteres'),
  validateRequest,
  signinController
);
router.post(
  '/login',
  body('email').isEmail().withMessage('Ingrese un email válido'),
  body('password').trim().notEmpty().withMessage('Contraseña obligatória'),
  validateRequest,
  loginController
);

export default router;
