import { Request, Response, NextFunction } from 'express';
import interactors from '../core/interactors/index.js';

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryName } = req.body;
  const category = await interactors.CategoryInteractor(categoryName);

  res.json(category);
};
