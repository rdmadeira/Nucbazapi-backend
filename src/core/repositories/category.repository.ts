import { Category } from '../entities/category.js';

export default interface CategoryRepository {
  createCategory(category: string): Promise<Category>;
  getCategories(): Promise<Category[]>;
}
