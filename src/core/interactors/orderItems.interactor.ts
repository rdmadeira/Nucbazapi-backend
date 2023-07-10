import OrderItemsRepository from '../repositories/orderItems.repository.js';
import { OrderItems } from '../entities/orders.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export const getOrderItemsByIdInteractor =
  (orderItemsRepository: OrderItemsRepository) =>
  async (
    orderId: string
  ): Promise<ResultPromiseResponse<OrderItems[] | null>> => {
    const orderItems = await orderItemsRepository.getOrderItemsById(orderId);

    if (!orderItems.success) return orderItems;

    if (!orderItems.result) return { success: true, result: null };
    /* if (!orderItems) return { success: true, result: null }; */

    /* const paymentsResult = await paymentRepository.getPaymentFromPreferenceId(
      orderItems.result.paymentId
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
      return { success: true, result: { ...orderItems.result } };
    } */
    /* orderItems.statusId = state?.id ? state.id : orderItems.statusId; */

    return {
      success: true,
      result: [...orderItems.result ],
    };
  };
