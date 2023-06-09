import { Request, Response, NextFunction } from 'express';
import interactors from '../core/interactors/index.js';

export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryName } = req.body;
  const category = await interactors.CreateCategoryInteractor(categoryName);

  res.json({ message: 'Successfully created category', data: category });
};

// leer categoria:
export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categories = await interactors.GetCategoryInteractor();

  res
    .status(200)
    .json({ message: 'Get successfully categories', data: categories });
};
