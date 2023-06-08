import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
/* import { AuthResponse } from '../core/entities/Auth.js'; */
import interactors from '../core/interactors/index.js';
import { NotFoundError } from '../errors/not_found_error.js';
import { RequestValidatorError } from '../errors/request_validation_error.js';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  /* When an error occurs, we call the next(error) function and pass the error object as input. 
  The Express framework will process this by skipping all the functions in the middleware function 
  stack and triggering the functions in the error handling middleware function stack: */
  if (!errors.isEmpty()) return next(new RequestValidatorError(errors.array())); // next function with error skips all the normal no-error middleware

  const { email, password } = req.body;
  const loginResponse = await interactors.LoginAuthInteractor({
    email,
    password,
  });
  if (!loginResponse) {
    return next(new NotFoundError());
  } // Error handle inside each controller function is not Clean! Better using middlewares to handle that.

  res.status(200).json({ message: 'Successful Login!', ...loginResponse });
};

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  /* console.log('errors', errors); */

  /* When an error occurs, we call the next(error) function and pass the error object as input. 
  The Express framework will process this by skipping all the functions in the middleware function 
  stack and triggering the functions in the error handling middleware function stack: */
  if (!errors.isEmpty()) return next(new RequestValidatorError(errors.array())); // next function with error skips all the normal no-error middleware

  const { email, password, name } = req.body;
  const signInResponse = await interactors.SigninAuthInteractor({
    name,
    email,
    password,
  });
  /* if (!signInResponse) {
    res.status(404).json({ message: 'wrong credentials!' });
  } // Error handle inside each controller function is not Clean! Better using middlewares to handle that.*/
  res.status(200).json({ ...signInResponse, message: 'Successful Signed In!' });
};
