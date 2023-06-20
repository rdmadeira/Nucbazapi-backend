import {
  createCategoryInteractor,
  getCategoriesInteractor,
} from './category.interactor.js';
import {
  authLoginInteractor,
  authSigninInteractor,
} from './auth.interactor.js';
import { getUserByIdInteractor } from './user.interactor.js';
import {
  createProductInteractor,
  deleteProductInteractor,
  getProductInteractor,
  getProductsInteractor,
  updateProductInteractor,
} from './product.interactor.js';

// Datasources:
import CategoryDataSource from '../../data_sources/category.datasource.js';
import AuthDataSource from '../../data_sources/auth.datasource.js';
import UserDatasource from '../../data_sources/user.datasource.js';
import ProductsDataSource from '../../data_sources/products.datasource.js';

//implementa el category repository:
// Repositories:
const categoryRepository = new CategoryDataSource();
const authRepository = new AuthDataSource();
const userRepository = new UserDatasource();
const productsRepository = new ProductsDataSource();
/* const productsRepository =  */

//Interactors:
const CreateCategoryInteractor = createCategoryInteractor(categoryRepository);
const GetCategoryInteractor = getCategoriesInteractor(categoryRepository);
const LoginAuthInteractor = authLoginInteractor(authRepository);
const SigninAuthInteractor = authSigninInteractor(authRepository);
const GetUserByIdInteractor = getUserByIdInteractor(userRepository);
const CreateProductsInteractor = createProductInteractor(productsRepository);
const DeleteProductInteractor = deleteProductInteractor(productsRepository);
const GetProductInteractor = getProductInteractor(productsRepository);
const GetProductsInteractor = getProductsInteractor(productsRepository);
const UpdateProductInteractor = updateProductInteractor(productsRepository);

const interactors = {
  CreateCategoryInteractor,
  GetCategoryInteractor,
  LoginAuthInteractor,
  SigninAuthInteractor,
  GetUserByIdInteractor,
  CreateProductsInteractor,
  DeleteProductInteractor,
  GetProductInteractor,
  GetProductsInteractor,
  UpdateProductInteractor,
};

export default interactors;
