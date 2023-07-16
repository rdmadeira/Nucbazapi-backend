import { Product } from '../entities/products.js';
import {
  ProductRequestDto,
  ProductResponseDto,
  ProductUpdateData,
} from '../dto/product.js';
import ProductsRepository from '../repositories/products.repository.js';
import { ResultPromiseResponse } from '../responseTypes/response.js';

export const createProductInteractor =
  (productsRepository: ProductsRepository) =>
  async (
    productData: ProductRequestDto
  ): Promise<ResultPromiseResponse<ProductResponseDto>> => {
    const newProductResult = await productsRepository.createProduct(
      productData
    );

    if (!newProductResult.success) {
      return newProductResult;
    }

    return {
      success: true,
      result: {
        ...newProductResult,
        name: productData.name,
        price: productData.price,
        categoryId: productData.categoryId,
      },
    };
  };

export const getProductsInteractor =
  (productsRepository: ProductsRepository) =>
  async (): Promise<ResultPromiseResponse<Product[]>> => {
    const products = await productsRepository.getProducts();

    if (!products.success) return products;

    return products;
  };

export const getProductInteractor =
  (productsRepository: ProductsRepository) =>
  async (productId: number): Promise<ResultPromiseResponse<Product | null>> => {
    const product = await productsRepository.getProduct(productId);

    return product;
  };

export const deleteProductInteractor =
  (productsRepository: ProductsRepository) =>
  async (
    productId: number
  ): Promise<ResultPromiseResponse<ProductResponseDto>> => {
    const product = await productsRepository.deleteProduct(productId);

    return product;
  };

export const updateProductInteractor =
  (productsRepository: ProductsRepository) =>
  async (
    productId: number,
    productProp: ProductUpdateData
  ): Promise<ResultPromiseResponse<ProductResponseDto>> => {
    const product = await productsRepository.updateProduct(
      productId,
      productProp
    );

    return product;
  };
