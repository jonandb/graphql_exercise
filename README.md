---
title: Node.js - Exercise - Graphql 
---

# Prerequisites 

Run following script to create the DB

```bash
# create Northwind DB
yarn seed
```

# Exercise 1 - Create a graphql API for the following schema

```graphql
type Author {
  id: ID!
  firstName: String
  lastName: String
}

type Post {
  id: ID!
  title: String
  votes: Int
}

type Query {
  posts: [Post]
  authors: [Author]
  author(id: ID): Author
}
```

```js
// graphql/author.ts
const authors = [
  { id: '1', firstName: 'Tom', lastName: 'Coleman' },
  { id: '2', firstName: 'Sashko', lastName: 'Stubailo' },
  { id: '3', firstName: 'Mikhail', lastName: 'Novikov' },
];
```

```js
// graphql/post.ts
const posts = [
  { id: '1', authorId: '1', title: 'Introduction to GraphQL', votes: 2 },
  { id: '2', authorId: '2', title: 'Welcome to Meteor', votes: 3 },
  { id: '3', authorId: '2', title: 'Advanced GraphQL', votes: 1 },
  { id: '4', authorId: '3', title: 'Launchpad is Cool', votes: 7 },
];
```

# Exercise 2 - Add relations to the Post & Author schema

```graphql
type Author {
  id: Int!
  firstName: String
  lastName: String
  posts: [Post] # <---- add
}

type Post {
  id: Int!
  title: String
  author: Author # <---- add
  votes: Int
}

type Query {
  posts: [Post]
  authors: [Author]
  author(id: Int!): Author
}
```

# Exercise 3 - MongoDB DataSource

Implement the following schema and get data from mongodb

```graphql
type Product {
  id: ID!
  name: String
  price: Float
  unitsInStock: Int
  unitsOnOrder: Int
  category: Category
}

type Category {
  id: ID!
  name: String
  description: String
  products: [Product]
}

type Query {
  product(id: ID): Product
  products: [Product]
  categories: [Category]
}
```

## Optional

* Add typing for the resolvers
* Add paging for Products query

```graphql
type Query {
  products(limit: Int, offset: Int): [Product]
}
```

* Add the following schema & query

```graphql
type Order  {
  id: ID!
  orderDate: DateTime
  requiredDate: DateTime
  shippedDate: DateTime
  details: [OrderDetail]
  shipAddress: Address
}

type OrderDetail {
  product: Product
  unitPrice: Float
  quantity: Int
  discount: Float
}

extend type Query {
  orders(limit: Int, offset: Int): [Order]
}
```

# Exercise 4 - Mutations

Implement the following schema and update data to mongodb

```graphql
type CreateProductInput {
  id: ID!
  name: String!
  price: Float
  unitsInStock: Int
  unitsOnOrder: Int
  categoryId: ID
}

type CreateProductPayload {
  product: Product
}

type Mutation {
  createProduct(input: CreateProductInput): CreateProductPayload
}

## Optional

* Add typing for the resolvers
* Add error handling when customer doesn't exist


