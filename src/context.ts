import { Request } from 'express';
import { CategoryResource } from './CategorySource';
import { ProductsResource } from './ProductSource';

export interface Context {
  dataSources: {
    products: ProductsResource;
    categories: CategoryResource;
  };
}
