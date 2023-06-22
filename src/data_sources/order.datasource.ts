import { OrderRequestDto } from '../core/dto/orderDto.js';
import { Orders } from '../core/entities/orders.js';
import OrderRepository from '../core/repositories/order.repository.js';
import { ResultPromiseResponse } from '../core/responseTypes/response.js';
import prisma from '../config/db.js';
import { ServerError } from '../errors/server_error.js';

export default class OrderDataSource implements OrderRepository {
  public async createOrder(
    data: OrderRequestDto
  ): Promise<ResultPromiseResponse<Orders>> {
    const pendingState = await prisma.status.findUnique({
      // la prop tiene que estar seteada como unique en el prisma.schema
      where: {
        state: 'pending',
      },
    });

    // Error handle de caso no funcione la consulta de prisma
    if (!pendingState)
      return {
        success: false,
        err: new ServerError('Error inesperado en el servidor'),
      };

    const order = await prisma.orders.create({
      // La transaction según docu de prisma, se hace por Nested writes (si son dependentes), $transaction Api (se son independentes). En este
      // caso, usamos la Nested, para orders y orderItems:
      data: {
        userId: data.userId,
        statusId: pendingState.id,
        ShippingPrice: data.shippingPrice,
        total: data.total,
        subTotal: data.subtotal,
        OrderItems: {
          createMany: { data: [...data.items] }, // orderId no hace parte del request al crear, porque se genera solo al crear el orden.
        },
      },
      include: {
        OrderItems: true,
      },
    });
  }
  public async getOrder(): Promise<ResultPromiseResponse<Orders>> {}
}
