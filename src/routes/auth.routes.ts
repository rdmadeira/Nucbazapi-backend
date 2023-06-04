import { Router } from 'express';
import {
  loginController,
  signinController,
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/signin', signinController);
router.post('/login', loginController);

export default router;
