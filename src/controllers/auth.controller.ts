import { Request, Response, NextFunction } from 'express';
/* import { AuthResponse } from '../core/entities/Auth.js'; */
import interactors from '../core/interactors/index.js';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const loginResponse = await interactors.LoginAuthInteractor({
    email,
    password,
  });
  if (!loginResponse) {
    return res.status(404).json({ message: 'wrong credentials!' });
  }

  res.status(200).json({ message: 'Successful Login!', ...loginResponse });
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
  if (!signInResponse) {
    res.status(404).json({ message: 'wrong credentials!' });
  }
  res.status(200).json({ ...signInResponse, message: 'Successful Signed In!' });
};
