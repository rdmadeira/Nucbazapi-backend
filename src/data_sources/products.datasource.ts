import { ProductRequestDto, ProductResponseDto } from '../core/dto/product.js';
import { Product } from '../core/entities/products.js';
import ProductsRepository from '../core/repositories/products.repository.js';
import { ResultPromiseResponse } from '../core/responseTypes/response.js';
import { ServerError } from '../errors/server_error.js';

import prisma from '../config/db.js';
import { NotFoundError } from '../errors/not_found_error.js';

import { Products } from '@prisma/client';

export default class ProductsDataSource implements ProductsRepository {
  public async getProducts(): Promise<ResultPromiseResponse<Product[]>> {
    try {
      const products = await prisma.products.findMany({
        orderBy: { name: 'asc' },
      });

      return {
        success: true,
        result: products,
      };
    } catch (error) {
      console.error('Prisma Error: ', error);

      const err = new ServerError('Server Not Respond!');

      return {
        success: false,
        err,
      };
    }
  }

  public async getProduct(
    productId: number
  ): Promise<ResultPromiseResponse<Product | null>> {
    try {
      const product = await prisma.products.findUnique({
        where: { id: productId },
      });

      if (!product)
        return {
          success: true,
          result: null,
        };

      return {
        success: true,
        result: product,
      };
    } catch (error) {
      console.error('Prisma Error: ', error);

      const err = new ServerError('Server Not Respond!');

      return {
        success: false,
        err,
      };
    }
  }

  public async createProduct(
    product: ProductRequestDto
  ): Promise<ResultPromiseResponse<Product>> {
    try {
      const newProduct = await prisma.products.create({ data: product });

      return {
        success: true,
        result: newProduct,
      };
    } catch (error) {
      console.error('Prisma Error: ', error);

      const err = new ServerError('Server Not Respond!');

      return {
        success: false,
        err,
      };
    }
  }

  public async deleteProduct(
    productId: number
  ): Promise<ResultPromiseResponse<ProductResponseDto>> {
    try {
      const deletedProduct = await prisma.products.delete({
        where: { id: productId },
      });
      return {
        success: true,
        result: {
          name: deletedProduct.name,
          categoryId: deletedProduct.categoryId,
        },
      };
    } catch (error) {
      console.error('Prisma Error: ', error);

      const err = new ServerError('Server Not Respond!');

      return {
        success: false,
        err,
      };
    }
  }

  public async updateProduct(
    productId: number,
    productProps: ProductRequestDto
  ): Promise<ResultPromiseResponse<Product>> {
    const productToUpdate = await prisma.products.findUnique({
      where: { id: productId },
    });

    if (!productToUpdate)
      return {
        success: false,
        err: new NotFoundError(),
      };

    const productPropsArr = Object.keys(productProps) as Array<never>;

    productPropsArr.forEach((prop) => {
      productToUpdate[prop] = productProps[prop];
    });

    try {
      const updateProduct = await prisma.products.update({
        where: { id: productToUpdate.id },
        /* data: { ...productToUpdate, ...productProp }, */
        data: { ...productToUpdate },
      });

      return { success: true, result: updateProduct };
    } catch (error) {
      console.error('Prisma Error: ', error);

      const err = new ServerError('Server Not Respond!');

      return {
        success: false,
        err,
      };
    }
  }
}
