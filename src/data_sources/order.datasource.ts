import { OrderRequestDto } from '../core/dto/orderDto.js';
import { Orders } from '../core/entities/orders.js';
import OrderRepository from '../core/repositories/order.repository.js';
import { ResultPromiseResponse } from '../core/responseTypes/response.js';
import prisma from '../config/db.js';
import { ServerError } from '../errors/server_error.js';
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

    const findShippingDetails = await prisma.shippingDetails.findFirst({
      where: {
        AND: {
          localidad: data.shippingDetails.localidad,
          domicilio: data.shippingDetails.domicilio,
        },
      },
    });

    // Acá está distinto del nucba-zapi-api 5 56min. El profesor no crea el shippingDetails acá, pero sí al crear el order, como nested writes. Hace eso porque usa una relación one-to-many entre orders y shippingDetails. Yo decidi usar al reves, o sea relación one-to-many entre shippingDetails y orders. Por eso lo creé acá y puse include shippingDetails: true, al crear el orden.
    const shippingDetails = await prisma.shippingDetails.upsert({
      where: { id: findShippingDetails?.id },
      update: {},
      create: {
        ...data.shippingDetails,
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
      const order: Orders = await prisma.orders.create({
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
            // En prisma, se llama, en transactions, nested writes, o sea crea la linea
            create: [...OI], // orderId no hace parte del request al crear, porque se genera solo al crear el orden.
          },
        }, // Está distinto del api-nucba-zapi 5 - 56min. Yo adopté una relación one-to-many entre shippingDetails y orders. El profesor adoptó al revés, one-to-many entre orders y shippingDetails.
        include: {
          shippingDetails: true,
        },
      });
      return { result: order, success: true };
    } catch (error) {
      console.log('Error: ', error);

      const err = new ServerError('Error al crear');
      return { success: false, err: err };
    }
  }
  public async getOrdersByUserId(
    userId: number
  ): Promise<ResultPromiseResponse<Orders[]>> {
    try {
      const orders = await prisma.orders.findMany({
        where: {
          userId: userId,
        },
        include: {
          OrderItems: true,
        },
      });
      const payments = await fetch();
      return { result: orders, success: true };
    } catch (error: any) {
      const err = new ServerError(
        error.message || 'Error Interno del Servidor'
      );
      return { err, success: false };
    }
  }
  public async getOrder(
    orderId: string
  ): Promise<ResultPromiseResponse<Orders | null>> {
    try {
      const order = await prisma.orders.findUnique({
        where: { id: orderId },
        include: { OrderItems: true },
      });

      return { result: order, success: true };
    } catch (error: any) {
      const err = new ServerError(
        error.message || 'Error interno en el Servidor'
      );
      return { err, success: false };
    }
  }
}
