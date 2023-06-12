import {
  createCategoryInteractor,
  getCategoriesInteractor,
} from './category.interactor.js';
import {
  authLoginInteractor,
  authSigninInteractor,
} from './auth.interactor.js';
import { getUserByIdInteractor } from './user.interactor.js';

import CategoryDataSource from '../../data_sources/category.datasource.js';
import AuthDataSource from '../../data_sources/auth.datasource.js';
import UserDatasource from '../../data_sources/user.datasource.js';

//Crea el category repository:
// Repositories:
const categoryRepository = new CategoryDataSource();
const authRepository = new AuthDataSource();
const userRepository = new UserDatasource();

//Interactors:
const CreateCategoryInteractor = createCategoryInteractor(categoryRepository);
const GetCategoryInteractor = getCategoriesInteractor(categoryRepository);
const LoginAuthInteractor = authLoginInteractor(authRepository);
const SigninAuthInteractor = authSigninInteractor(authRepository);
const GetUserByIdInteractor = getUserByIdInteractor(userRepository);

const interactors = {
  CreateCategoryInteractor,
  GetCategoryInteractor,
  LoginAuthInteractor,
  SigninAuthInteractor,
  GetUserByIdInteractor,
};

export default interactors;
