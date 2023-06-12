import { Router } from 'express';
import { authorizedAdmin, verifyAuth } from '../middlewares/auth.js';
import {
  createCategory,
  getCategories,
} from '../controllers/category.controller.js';

const router = Router();

router
  .post('/', verifyAuth, authorizedAdmin('admin'), createCategory) // Ruta con metodo post está protegida (si es de un user loggeado) y autorizada (si el user es de un Role admin) para admin!!
  .get('/categories', getCategories);

export default router;
