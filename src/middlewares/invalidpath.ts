import { NextFunction, Request, Response } from 'express';

export const invalidPathHandle = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({ message: 'Invalid Path' });
};
