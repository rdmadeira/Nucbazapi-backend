import { CategoryDto } from '../dto/categoryDto.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export default interface OrderRepository {
  createOrder(
    data: OrderRequestDto
  ): Promise<ResultPromiseResponse<OrderResponseDto>>; // Si el resultado de la promesa es Success, devuelve la categoría. Si falla, devuelve el Failure.
  getOrder(): Promise<ResultPromiseResponse<CategoryDto[]>>;
}
