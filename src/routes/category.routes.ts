import { Router } from 'express';
import {
  createCategory,
  getCategories,
} from '../controllers/category.controller.js';

const router = Router();

router.post('/', createCategory).get('/categories', getCategories);

export default router;
