import { OrderRequestDto } from '../core/dto/orderDto.js';
import { Orders } from '../core/entities/orders.js';
import OrderItemsRepository from '../core/repositories/orderItems.repository.js';
import { ResultPromiseResponse } from '../core/responseTypes/response.js';
import prisma from '../config/db.js';
import { ServerError } from '../errors/server_error.js';
import { OrderItems } from '../core/entities/orders.js';

export default class OrderItemsDataSource implements OrderItemsRepository {
  public async getOrderItemsById(
    orderId: string
  ): Promise<ResultPromiseResponse<OrderItems[] | null>> {
    try {
      const orderItems = await prisma.orderItems.findMany({
        where: { orderId: orderId },
        include: {
          product: true,
        },
      });
      if (!orderItems) return { success: true, result: null };
      console.log('orderItems', orderItems);

      return { result: orderItems, success: true };
    } catch (error: any) {
      const err = new ServerError(
        error.message || 'Error interno en el Servidor'
      );
      return { err, success: false };
    }
  }
}
