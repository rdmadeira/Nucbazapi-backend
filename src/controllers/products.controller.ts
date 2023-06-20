import { Request, Response, NextFunction } from 'express';
import { ProductUpdateData } from '../core/dto/product.js';
import interactors from '../core/interactors/index.js';
import { ProductRequestDto } from '../core/dto/product.js';

export const productsCreateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productData: ProductRequestDto = req.body;

  const productResponse = await interactors.CreateProductsInteractor(
    productData
  );

  if (!productResponse.success) return next(productResponse.err);

  res
    .status(200)
    .json({ ...productResponse, message: 'Successfully created Product!' });
};

export const productGetController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId }: { productId: number } = req.body;
  const productResponse = await interactors.GetProductInteractor(productId);

  if (!productResponse.success) return next(productResponse.err);

  res
    .status(200)
    .json({ ...productResponse, message: 'Product succesfully request!' });
};

export const productsGetController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productsResponse = await interactors.GetProductsInteractor();

  if (!productsResponse.success) return next(productsResponse.err);

  res
    .status(200)
    .json({ ...productsResponse, message: 'Product succesfully request!' });
};

export const productsUpdateController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId, data }: { productId: number; data: ProductUpdateData } =
    req.body;
  const productsResponse = await interactors.UpdateProductInteractor(
    productId,
    data
  );

  if (!productsResponse.success) return next(productsResponse.err);

  res
    .status(200)
    .json({ ...productsResponse, message: 'Product succesfully request!' });
};

export const productsDeleteController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId }: { productId: number } = req.body;

  const productResponse = await interactors.DeleteProductInteractor(productId);

  if (!productResponse.success) return next(productResponse.err);

  res
    .status(200)
    .json({ ...productResponse, message: 'Succesfully deleted Product' });
};
