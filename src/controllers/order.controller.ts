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

  res.json({ message: 'Successfully created order', data: orderResponse });
};

export const getOrdersByUserIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: number = parseInt(req.params.userId as string);

  const orders = await interactors.GetOrdersByUserIdInteractor(userId);

  if (!orders.success) return next(orders.err);

  return res
    .status(200)
    .json({ ...orders, message: 'Succesfully get user Orders!' });
};

export const getOrderByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orderId: string = req.params.orderId;

  const order = await interactors.GetOrderByIdInteractor(orderId);

  if (!order.success) return next(order.err);

  return res
    .status(200)
    .json({ ...order, message: 'Succesfully get user Order!' });
};

export const getOrderItemsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { orderId } = req.params;

  const orderItems = await interactors.GetOrderItemsInteractor(orderId);

  if (!orderItems.success) return next(orderItems.err);

  return res.json({ ...orderItems, message: 'Succesfully get Order Items' });
};
