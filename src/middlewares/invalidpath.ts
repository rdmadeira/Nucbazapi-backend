import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors/not_found_error.js';

export const NotFoundHandle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const invalidPath = new NotFoundError();
  next(invalidPath);
};
