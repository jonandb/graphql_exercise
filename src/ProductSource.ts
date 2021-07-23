import { MongoDataSource } from 'apollo-datasource-mongodb';

export interface ProductModel {
  _id: string;
  name: string;
}

export class ProductsResource extends MongoDataSource<ProductModel> {
  getAllProducts({ limit = 0, offset = 0 }) {
    // access to collection api
    return this.collection.find({}).limit(limit).skip(offset).toArray();
  }

  getProduct(productId) {
    // provide caching and batching out of the box
    return this.findOneById(productId);
  }
}
