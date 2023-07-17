import {
  OrderRequestDto,
  OrderResponseDto,
  OrderUpdateRequestDto,
} from '../dto/orderDto.js';
import {
  Currencies,
  PaymentItem,
  MercadoPagoPaymentResponseDto,
} from '../dto/mercadopago.js';
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
        description: item.description,
        picture_url: item.picture_url,
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
    if (!orders) return { success: true, result: [] };

    /* orders.result.forEach(async (order) => {
      if (!order.paymentId) return;

      const paymentsData = await paymentRepository.getPaymentFromPreferenceId(
        order.paymentId
      );

      if (!paymentsData.success) return order;
      const status =
        paymentsData.result.preferenceId
        

      const state = await prisma.status.findFirst({
        where: {
          state: status,
        },
      });
      order.statusId = state?.id ? state.id : order.statusId;
      console.log('paymentsData', paymentsData);
    }); */

    return { success: true, result: orders.result };
  };

export const getOrderByIdInteractor =
  (orderRepository: OrderRepository, paymentRepository: PaymentRepository) =>
  async (orderId: string): Promise<ResultPromiseResponse<Orders | null>> => {
    const order = await orderRepository.getOrderById(orderId);

    if (!order.success) return { success: order.success, err: order.err };

    if (!order.result) return { success: true, result: null };
    if (!order) return { success: true, result: null };

    if (!order.result.paymentId)
      return { success: true, result: { ...order.result } };

    /* const paymentsResult = await paymentRepository.getPaymentFromPreferenceId(
      order.result.paymentId
    );

    if (!paymentsResult.success) return paymentsResult;

    const status =
      paymentsResult?.result?.results &&
      paymentsResult?.result?.results[0].status;

    const state = await prisma.status.findFirst({
      where: {
        state: status,
      },
    });

    if (!state) {
      return { success: true, result: { ...order.result } };
    } */
    /* order.statusId = state?.id ? state.id : order.statusId; */

    return {
      success: true,
      result: { ...order.result /* , statusId: state.id */ },
    };
  };

export const updateOrderByOrderPayload =
  (orderRepository: OrderRepository) =>
  async (
    orderPayload: OrderUpdateRequestDto
  ): Promise<ResultPromiseResponse<MercadoPagoPaymentResponseDto>> => {
    const updatedOrderData = await orderRepository.updateOrderByOrderPayload(
      orderPayload
    );

    if (!updatedOrderData.success) return updatedOrderData;

    return {
      success: true,
      result: updatedOrderData.result,
    };
  };
