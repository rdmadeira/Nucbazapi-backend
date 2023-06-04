import { Router } from 'express';
import CategoryRoutes from './category.routes.js';
import AuthRoutes from './auth.routes.js';

const router = Router();

router.use('/category', CategoryRoutes);
router.use('/auth', AuthRoutes);

export default router;
