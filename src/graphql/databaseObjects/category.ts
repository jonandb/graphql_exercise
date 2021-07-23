import { gql, IFieldResolver } from 'apollo-server-express';
import { IResolvers } from 'graphql-tools';
import { Context } from '../../context';
import { Product } from './product';

export const typeDefs = gql`
  type Category {
    id: ID!
    name: String
    description: String
    products: [Product]
  }
  extend type Query {
    category: [Category]
  }
`;

export interface Category {
  id: string;
  name: string;
  description: string;
  products: Product[];
}

interface CategoryReslover extends IResolvers {
  Query: {
    category: IFieldResolver<unknown, Context>;
  };
}
export const resolvers: CategoryReslover = {
  Query: {
    category(root, args, context) {
      return context.dataSources.categories.getAllCategories();
    },
  },
  Category: {
    id(product) {
      return product._id;
    },
  },
};
