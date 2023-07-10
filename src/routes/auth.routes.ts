import { Router } from 'express';
import {
  loginController,
  signinController,
  getUserController,
} from '../controllers/auth.controller.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { verifyAuth } from '../middlewares/auth.js';
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
router.get('/:userId', verifyAuth, getUserController);
/* router.get('/', (req, res) => {
  res.status(200).json({ result: null });
}); */

export default router;
