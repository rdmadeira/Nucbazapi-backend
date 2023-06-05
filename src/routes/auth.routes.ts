import { Router } from 'express';
import {
  loginController,
  signinController,
} from '../controllers/auth.controller.js';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/signin',
  body('name').trim().notEmpty().withMessage('Nombre obligatório'),
  body('email').isEmail().withMessage('Ingrese un email válido'),
  body('password').trim().notEmpty().withMessage('Contraseña obligatória'),
  signinController
);
router.post(
  '/login',
  body('email').isEmail().withMessage('Ingrese un email válido'),
  body('password').trim().notEmpty().withMessage('Contraseña obligatória'),
  loginController
);

export default router;
