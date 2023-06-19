import { OrderRequestDto, OrderResponseDto } from '../dto/orderDto.js';
import { Currencies, PaymentItem } from '../dto/mercadopago.js';
import OrderRepository from '../repositories/order.repository.js';
import PaymentRepository from '../repositories/payment.repository.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export const createOrderInteractor =
  (orderRepository: OrderRepository, paymentRepository: PaymentRepository) =>
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
      external_reference: newOrderResult.result.id.toString(),
      items: paymentItems,
    });

    //retornamos el orderId, y el init_point
    console.log('preference', preference);

    return {
      success: true,
      result: {
        orderId: newOrderResult.result.id,
        ...preference, // Por lo visto, si está tipado, el ...spread operator solo trae las props del type definido
      },
    };
  };
