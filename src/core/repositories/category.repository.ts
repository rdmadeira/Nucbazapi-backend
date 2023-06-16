import { Category } from '../entities/category.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export default interface CategoryRepository {
  createCategory(category: string): Promise<ResultPromiseResponse<Category>>; // Si el resultado de la promesa es Success, devuelve la categoría. Si falla, devuelve el Failure.
  getCategories(): Promise<ResultPromiseResponse<Category[]>>;
}
