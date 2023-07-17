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
import { getOrderItemsByIdInteractor } from './orderItems.interactor.js';

// Datasources:
import CategoryDataSource from '../../data_sources/category.datasource.js';
import AuthDataSource from '../../data_sources/auth.datasource.js';
import UserDatasource from '../../data_sources/user.datasource.js';
import ProductsDataSource from '../../data_sources/products.datasource.js';
import {
  createOrderInteractor,
  getOrdersByUserIdInteractor,
  getOrderByIdInteractor,
  updateOrderByOrderPayload,
} from './orders.interactor.js';
import OrderDataSource from '../../data_sources/order.datasource.js';
import PaymentDataSource from '../../data_sources/payment.datasource.js';
import OrderItemsDataSource from '../../data_sources/orderItems.datasource.js';

//implementa el category repository:
// Repositories:
const categoryRepository = new CategoryDataSource();
const authRepository = new AuthDataSource();
const userRepository = new UserDatasource();
const productsRepository = new ProductsDataSource();
const orderRepository = new OrderDataSource();
const paymentRepository = new PaymentDataSource();
const orderItemsRepository = new OrderItemsDataSource();

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
const CreateOrderInteractor = createOrderInteractor(
  orderRepository,
  paymentRepository
);
const GetOrdersByUserIdInteractor = getOrdersByUserIdInteractor(
  orderRepository,
  paymentRepository
);
const GetOrderByIdInteractor = getOrderByIdInteractor(
  orderRepository,
  paymentRepository
);
const GetOrderItemsInteractor =
  getOrderItemsByIdInteractor(orderItemsRepository);

const UpdateOrderByOrderPayload = updateOrderByOrderPayload(orderRepository);

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
  CreateOrderInteractor,
  GetOrdersByUserIdInteractor,
  GetOrderByIdInteractor,
  GetOrderItemsInteractor,
  UpdateOrderByOrderPayload,
};

export default interactors;
