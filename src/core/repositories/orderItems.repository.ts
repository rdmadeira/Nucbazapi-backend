import { OrderRequestDto, OrderResponseDto } from '../dto/orderDto.js';
import { OrderItems, Orders } from '../entities/orders.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export default interface OrderItemsRepository {
  getOrderItemsById(
    orderItemsId: string
  ): Promise<ResultPromiseResponse<OrderItems[] | null>>;
}
