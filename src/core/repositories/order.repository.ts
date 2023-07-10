import { OrderRequestDto, OrderResponseDto } from '../dto/orderDto.js';
import { Orders } from '../entities/orders.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export default interface OrderRepository {
  createOrder(data: OrderRequestDto): Promise<ResultPromiseResponse<Orders>>; // Si el resultado de la promesa es Success, devuelve la categoría. Si falla, devuelve el Failure.
  getOrderById(orderId: string): Promise<ResultPromiseResponse<Orders | null>>;
  getOrdersByUserId(userId: number): Promise<ResultPromiseResponse<Orders[]>>;
}
