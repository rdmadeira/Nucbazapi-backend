import { OrderRequestDto } from '../core/dto/orderDto.js';
import { Orders } from '../core/entities/orders.js';
import OrderRepository from '../core/repositories/order.repository.js';
import { ResultPromiseResponse } from '../core/responseTypes/response.js';
import prisma from '../config/db.js';
import { ServerError } from '../errors/server_error.js';
import { it } from 'node:test';
import { OrderItems } from '../core/entities/orders.js';

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

    const shippingDetails = await prisma.shippingDetails.create({
      data: {
        localidad: data.shippingDetails.localidad,
        domicilio: data.shippingDetails.domicilio,
      },
    });

    // Error handle de caso no funcione la consulta de prisma
    if (!pendingState || !shippingDetails)
      return {
        success: false,
        err: new ServerError('Error inesperado en el servidor'),
      };

    const OI: OrderItems[] = data.items.map((item) => ({
      quantity: item.quantity,
      unityPrice: item.unityPrice,
      productId: item.productId,
    }));

    try {
      const order = await prisma.orders.create({
        // La transaction según docu de prisma, se hace por Nested writes (si son dependentes), $transaction Api (se son independentes). En este
        // caso, usamos la Nested, para orders y orderItems:

        data: {
          userId: data.userId,
          statusId: pendingState.id,
          ShippingPrice: data.shippingPrice,
          total: data.total,
          subTotal: data.subtotal,
          shippingDetailsId: shippingDetails.id,
          OrderItems: {
            createMany: { data: [...OI] }, // orderId no hace parte del request al crear, porque se genera solo al crear el orden.
          },
        },
        include: {
          OrderItems: true,
        },
      });
      return { result: order, success: true };
    } catch (error) {
      console.log('Error: ', error);

      const err = new ServerError('Error al crear');
      return { success: false, err: err };
    }
  }
  public async getOrder(): Promise<ResultPromiseResponse<Orders>> {}
}
