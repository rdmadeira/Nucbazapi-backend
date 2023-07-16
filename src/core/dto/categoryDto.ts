import { Product } from '../entities/products.js';

export interface CategoryDto {
  id: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}
