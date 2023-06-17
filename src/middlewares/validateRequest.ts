import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidatorError } from '../errors/request_validation_error.js';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new RequestValidatorError(errors.array()));
  }
};
