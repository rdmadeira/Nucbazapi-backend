import { Category } from '../entities/category.js';
import CategoryRepository from '../repositories/category.repository.js';

export const createCategoryInteractor =
  (categoryRepository: CategoryRepository) =>
  async (categoryName: string): Promise<Category> => {
    const newCategory = await categoryRepository.createCategory(categoryName);
    return newCategory;
  };
