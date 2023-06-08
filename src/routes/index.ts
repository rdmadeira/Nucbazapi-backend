import { Router, Request, Response } from 'express';
import CategoryRoutes from './category.routes.js';
import AuthRoutes from './auth.routes.js';

const router = Router();

router.use('/category', CategoryRoutes);
router.use('/auth', AuthRoutes);
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Especificá una entidad, formato de ruta /api/v1/<entidad>',
  });
});

export default router;
