import { gql } from 'apollo-server-express';
import { IResolvers, IFieldResolver } from 'graphql-tools';
import { Context } from '../context';
import { Post, posts } from './post';

export const typeDefs = gql`
  type Author {
    id: ID!
    firstName: String
    lastName: String
    posts: [Post]
  }
  extend type Query {
    authors: [Author]
    author(id: ID!): Author
  }
`;
export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  posts?: Post;
}
interface AuthorArgs {
  id: string;
}

interface AuthorResolver extends IResolvers {
  Query: {
    authors: IFieldResolver<unknown, Context, null, Author[]>;
    author: IFieldResolver<unknown, Context, AuthorArgs, Author | undefined>;
  };
  Author: {
    posts: IFieldResolver<Author, Context, null, Post[]>;
  };
}

export const authors = [
  { id: '1', firstName: 'Tom', lastName: 'Coleman' },
  { id: '2', firstName: 'Sashko', lastName: 'Stubailo' },
  { id: '3', firstName: 'Mikhail', lastName: 'Novikov' },
];

export const resolvers: AuthorResolver = {
  Query: {
    authors: () => authors,
    author: (root, args) => authors.find((author) => author.id === args.id),
  },
  Author: {
    posts(author) {
      return posts.filter((post: Post) => post.authorId === author.id);
    },
  },
};
