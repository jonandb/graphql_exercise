/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import { AddressInfo } from 'net';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql';

// Uncomment the following lines to the DB
import { openDB } from './db';
import { ProductsResource } from './ProductSource';
import { CategoryResource } from './CategorySource';

async function startup() {
  // Uncomment the following lines to the DB
  const client = await openDB();
  console.log('DB: ', client.isConnected() ? 'connected' : '');
  const productCollection = client.db().collection('products');
  const products = await productCollection.find({}).toArray();
  // console.log(products[0]);

  // Create Express App
  const app = express();

  // Add routes
  app.get('/', (req: Request, res: Response) => {
    res.json({
      hello: 'world',
    });
  });

  const server = new ApolloServer({
    schema,
    dataSources() {
      return {
        products: new ProductsResource(client.db().collection('products')),
        categories: new CategoryResource(client.db().collection('categories')),
      };
    },
  });
  await server.start(); // only for v3
  server.applyMiddleware({ app });

  // Listen to server
  const httpServer = app.listen(8000, () => {
    const addressInfo = httpServer.address() as AddressInfo;
    console.log(`⚡️[server]: Server is running at http://localhost:${addressInfo.port}`);
  });
}

startup().catch((err) => {
  console.log('ERROR: ', err);
});
