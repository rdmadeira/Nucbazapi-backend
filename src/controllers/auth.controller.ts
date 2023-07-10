import { Request, Response, NextFunction } from 'express';

import interactors from '../core/interactors/index.js';
/* import { NotFoundError } from '../errors/not_found_error.js';

import { UserExistsError } from '../errors/user_exists.js'; */

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /* When an error occurs, we call the next(error) function and pass the error object as input. 
  The Express framework will process this by skipping all the functions in the middleware function 
  stack and triggering the functions in the error handling middleware function stack: */

  // como se repite es interesante poner en un middleware para reutilizalo
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) return next(new RequestValidatorError(errors.array())); // next function with error skips all the normal no-error middleware

  const { email, password } = req.body;
  const loginResponse = await interactors.LoginAuthInteractor({
    email,
    password,
  });

  if (!loginResponse.success) {
    return next(loginResponse.err);
  } // Error handle inside each controller function is not Clean! Better using middlewares to handle that.

  res.status(200).json({ message: 'Successful Login!', ...loginResponse });
};

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /* console.log('errors', errors); */

  /* When an error occurs, we call the next(error) function and pass the error object as input. 
  The Express framework will process this by skipping all the functions in the middleware function 
  stack and triggering the functions in the error handling middleware function stack: */
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) return next(new RequestValidatorError(errors.array())); // next function with error skips all the normal no-error middleware

  const { email, password, name, roleId } = req.body;
  const signInResponse = await interactors.SigninAuthInteractor({
    name,
    email,
    password,
    roleId,
  });
  if (!signInResponse.success) {
    return next(signInResponse.err);
  } // Error handle inside each controller function is not Clean! Better using middlewares to handle that.
  res
    .status(200)
    .json({ ...signInResponse, message: 'Successful Signued Up!' });
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;

  const userResponse = await interactors.GetUserByIdInteractor(
    parseInt(userId)
  );

  if (!userResponse.success) {
    return next(userResponse.err);
  }

  return res
    .status(200)
    .json({ ...userResponse, message: 'User successfully fetched' });
};
