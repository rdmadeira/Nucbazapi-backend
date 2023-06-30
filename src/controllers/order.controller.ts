import { Request, Response, NextFunction } from 'express';
import interactors from '../core/interactors/index.js';

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderData = req.body;
  const orderResponse = await interactors.CreateOrderInteractor(orderData);

  if (!orderResponse.success) {
    return next(orderResponse.err); // definido en datasource como badrequest
  }

  res.json({ message: 'Successfully created category', data: orderResponse });
};
