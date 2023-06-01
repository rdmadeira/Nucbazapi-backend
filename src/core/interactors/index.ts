import { createCategoryInteractor } from './category.interactor.js';
import CategoryDataSource from '../../data_sources/category.datasource.js';

//Crea el category repository:
const categoryRepository = new CategoryDataSource();

const CategoryInteractor = createCategoryInteractor(categoryRepository);

const interactors = {
  CategoryInteractor,
};

export default interactors;
