import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs as Author, resolvers as authorResolvers } from './author';
import { typeDefs as Post, resolvers as postResolvers } from './post';
import { typeDefs as Product, resolvers as productResolvers } from './databaseObjects/product';
import { typeDefs as Category, resolvers as categoryResolvers } from './databaseObjects/category';

const schema = makeExecutableSchema({
  typeDefs: [Author, Post, Product, Category],
  resolvers: [authorResolvers, postResolvers, productResolvers, categoryResolvers],
});

export default schema;
