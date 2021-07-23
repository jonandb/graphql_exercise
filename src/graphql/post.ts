import { gql } from 'apollo-server-express';
import { IResolvers, IFieldResolver } from 'graphql-tools';
import { Context } from '../context';
import { Author, authors } from './author';

export const typeDefs = gql`
  type Post {
    id: ID!
    title: String
    votes: Int
    author: Author
  }
  type Query {
    posts: [Post]
  }
`;

export interface Post {
  id: string;
  authorId: string;
  title: string;
  votes: number;
  author?: Author;
}

interface PostResolver extends IResolvers {
  Query: {
    posts: IFieldResolver<unknown, Context, null, Post[]>;
  };
  Post: {
    author: IFieldResolver<Post, Context, null, Author | undefined>;
  };
}

export const posts: Post[] = [
  { id: '1', authorId: '1', title: 'Introduction to GraphQL', votes: 2 },
  { id: '2', authorId: '2', title: 'Welcome to Meteor', votes: 3 },
  { id: '3', authorId: '2', title: 'Advanced GraphQL', votes: 1 },
  { id: '4', authorId: '3', title: 'Launchpad is Cool', votes: 7 },
];

export const resolvers: PostResolver = {
  Query: {
    posts: () => posts,
  },
  Post: {
    author(post) {
      console.log(post);
      return authors.find((author) => {
        console.log(author);
        return author.id === post.authorId;
      });
    },
  },
};
