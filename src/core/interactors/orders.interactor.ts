import { OrderRequestDto, OrderResponseDto } from '../dto/orderDto.js';
import { Currencies, PaymentItem } from '../dto/mercadopago.js';
import OrderRepository from '../repositories/order.repository.js';
import PaymentRepository from '../repositories/payment.repository.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';
import prisma from '../../config/db.js';
import { Orders } from '../entities/orders.js';

export const createOrderInteractor =
  (
    orderRepository: OrderRepository,
    paymentRepository: PaymentRepository // Crea el order y el payment en la base de datos
  ) =>
  async (
    orderData: OrderRequestDto
  ): Promise<ResultPromiseResponse<OrderResponseDto>> => {
    // acá es adonde se crea la orden
    const newOrderResult = await orderRepository.createOrder(orderData);

    if (!newOrderResult.success) {
      return newOrderResult;
    }

    // creamos el pago:
    let paymentItems: PaymentItem[] = [];

    orderData.items.forEach((item) => {
      const paymentItem: PaymentItem = {
        currency_id: Currencies.ARS,
        unit_price: item.unityPrice,
        quantity: item.quantity,
        title: item.title,
      };
      paymentItems.push(paymentItem);
    });

    const preference = await paymentRepository.createPreference({
      external_reference: newOrderResult.result.id, // es la referencia de la preferencia, que es el id de la order
      items: paymentItems,
      shipments: {
        cost: orderData.shippingPrice,
      },
    });

    //retornamos el orderId, y el init_point
    /* orderId: string;
preferenceId: string;
init_point: string; */
    if (!preference.success) return preference;

    return {
      success: true,
      result: { ...preference.result, orderId: newOrderResult.result.id },
    };
  };

// No está en la video aula:
export const getOrdersByUserIdInteractor =
  (orderRepository: OrderRepository, paymentRepository: PaymentRepository) =>
  async (userId: number): Promise<ResultPromiseResponse<Orders[]>> => {
    const orders = await orderRepository.getOrdersByUserId(userId);

    if (!orders.success) return orders;

    orders.result.forEach(async (order) => {
      const paymentsResult = await paymentRepository.getPaymentFromOrderId(
        order.id
      );

      if (!paymentsResult.success) return order;
      const { status } = paymentsResult.result.results[0];

      const state = await prisma.status.findFirst({
        where: {
          state: status,
        },
      });
      order.statusId = state?.id ? state.id : order.statusId;
    });

    return { success: true, result: orders.result };
  };
