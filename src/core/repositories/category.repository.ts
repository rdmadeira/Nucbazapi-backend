import { CategoryDto } from '../dto/categoryDto.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export default interface CategoryRepository {
  createCategory(category: string): Promise<ResultPromiseResponse<CategoryDto>>; // Si el resultado de la promesa es Success, devuelve la categoría. Si falla, devuelve el Failure.
  getCategories(): Promise<ResultPromiseResponse<CategoryDto[]>>;
}
