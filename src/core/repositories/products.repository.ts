// Todo - crear un CRUD de productos, para un sistema de administracion
import { Product } from '../entities/products.js';
import { ProductRequestDto, ProductResponseDto } from '../dto/product.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export default interface ProductsRepository {
  getProducts(): Promise<ResultPromiseResponse<Product[]>>;
  getProduct(productId: number): Promise<ResultPromiseResponse<Product | null>>;
  createProduct(
    product: ProductRequestDto
  ): Promise<ResultPromiseResponse<Product>>;
  deleteProduct(
    productId: number
  ): Promise<ResultPromiseResponse<ProductResponseDto>>;
  updateProduct(
    productId: number,
    productProps: ProductRequestDto
  ): Promise<ResultPromiseResponse<Product>>;
}
