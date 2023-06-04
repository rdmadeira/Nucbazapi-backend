import { createCategoryInteractor } from './category.interactor.js';
import {
  authLoginInteractor,
  authSigninInteractor,
} from './auth.interactor.js';
import CategoryDataSource from '../../data_sources/category.datasource.js';
import AuthDataSource from '../../data_sources/auth.datasource.js';

//Crea el category repository:
// Repositories:
const categoryRepository = new CategoryDataSource();
const authRepository = new AuthDataSource();

const CategoryInteractor = createCategoryInteractor(categoryRepository);
const LoginAuthInteractor = authLoginInteractor(authRepository);
const SigninAuthInteractor = authSigninInteractor(authRepository);

const interactors = {
  CategoryInteractor,
  LoginAuthInteractor,
  SigninAuthInteractor,
};

export default interactors;
