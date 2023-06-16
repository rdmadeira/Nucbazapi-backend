import { Category } from '../core/entities/category.js';
import { ResultPromiseResponse } from '../core/responseTypes/response.js';
import CategoryRepository from '../core/repositories/category.repository.js';
import prisma from '../config/db.js';
import { BadRequestError } from '../errors/bad_request_error.js';
import { ServerError } from '../errors/server_error.js';

export default class CategoryDataSource implements CategoryRepository {
  public async createCategory(
    categoryName: string
  ): Promise<ResultPromiseResponse<Category>> {
    try {
      const category = await prisma.category.create({
        data: { category: categoryName },
      });
      // logger.Info('Categoría Creada con suceso')

      return { success: true, result: category };
    } catch (error) {
      // err - Error de prisma
      //El error real deberiamos loggear en la consola o en un file .log:
      // logger.Error('Error al crear categoría')
      console.log('Error al crear categoría:', error);

      // Como esta es una API que consume un cliente front end, caso falle una promesa, tenemos que enviar un mensaje claro de lo que falló.
      let err = new BadRequestError('Algo salió mal al crear categoría'); // Bad Request es para el CREATE

      return { success: false, err };
    }
  }
  public async getCategories(): Promise<ResultPromiseResponse<Category[]>> {
    try {
      const categories = await prisma.category.findMany();
      return { success: true, result: categories };
    } catch (error) {
      console.log('Server Not Respond!', error);

      let err = new ServerError('Server Not Respond!'); // Server Error es para el GET
      return { success: false, err };
    }
  }
}
