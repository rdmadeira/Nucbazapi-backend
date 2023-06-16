import { Category } from '../entities/category.js';
import CategoryRepository from '../repositories/category.repository.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export const createCategoryInteractor =
  (categoryRepository: CategoryRepository) =>
  async (categoryName: string): Promise<ResultPromiseResponse<Category>> => {
    const newCategoryResult = await categoryRepository.createCategory(
      categoryName
    );
    return newCategoryResult;
  };

export const getCategoriesInteractor =
  (categoryRepository: CategoryRepository) =>
  async (): Promise<ResultPromiseResponse<Category[]>> => {
    const newCategories = await categoryRepository.getCategories();
    return newCategories;
  };
