import { Request, Response, NextFunction } from 'express';
import { AuthResponse } from '../core/entities/auth.js';
import interactors from '../core/interactors/index.js';

export const loginController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
};

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, name } = req.body;
  const signInResponse = await interactors.SigninAuthInteractor({
    name,
    email,
    password,
  });
  res.json({ ...signInResponse, message: 'success' });
};
