import { gql, IFieldResolver, IResolvers } from 'apollo-server-express';
import { Context } from '../../context';
import { Category } from './category';

export const typeDefs = gql`
  type Product {
    id: ID!
    category: Category
    name: String
    price: Float
    categoryID: ID
    unitsInStock: Int
    unitsOnOrder: Int
  }
  extend type Query {
    products(limit: Int, offset: Int): [Product]
    product(id: ID!): Product
  }
`;

export interface Product {
  id: string;
  name: string;
  price: Float32Array;
  unitsInStock: number;
  unitsOnOrder: number;
  category: Category;
}
interface ProductArgs {
  id: string;
}
interface ProductListArgs {
  limit?: number;
  offset?: number;
}
interface ProductReslover extends IResolvers {
  Query: {
    products: IFieldResolver<unknown, Context>;
    product: IFieldResolver<unknown, Context, ProductArgs>;
  };
}
export const resolvers: ProductReslover = {
  Query: {
    products(root, args: ProductListArgs, context: Context) {
      return context.dataSources.products.getAllProducts(args);
    },
    product(root, args: ProductArgs, context: Context) {
      return context.dataSources.products.getProduct(args.id);
    },
  },
  Product: {
    id(product) {
      return product._id;
    },
    price(product) {
      return product.unitPrice;
    },
    category(product, args, context: Context) {
      const result = context.dataSources.categories.getCategory(product.categoryID);
      return result;
    },
  },
};
