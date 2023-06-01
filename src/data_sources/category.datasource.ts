import { Category } from '../core/entities/category.js';
import CategoryRepository from '../core/repositories/category.repository.js';
import prisma from '../config/db.js';

export default class CategoryDataSource implements CategoryRepository {
  public async createCategory(categoryName: string): Promise<Category> {
    const category = await prisma.category.create({ category: categoryName });
    return category;
  }
}