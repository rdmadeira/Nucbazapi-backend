import { OrderRequestDto, OrderResponseDto } from '../dto/orderDto.js';

import OrderRepository from '../repositories/order.repository.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export const createOrderInteractor =
  (orderRepository: OrderRepository) =>
  async (
    orderData: OrderRequestDto
  ): Promise<ResultPromiseResponse<OrderResponseDto>> => {
    // acá es adonde se crea la orden
    const newOrderResult = await orderRepository.createOrder(orderData);

    // creamos el pago:

    //retornamos el orderId, y el init_point
    if (!newOrderResult.success) {
      return {
        success: false,
        err: new Error('Something wront in create order'),
      };
    }
    return {
      success: true,
      result: {
        orderId: newOrderResult.result.id,
        preferenceId: newOrderResult.result.paymentId,
        init_point: 'lskmfo8sfel8.eiouoeiw/eljflew=?ñwefk',
      },
    };
  };
