import { MongoDataSource } from 'apollo-datasource-mongodb';

export interface CategoryModel {
  _id: string;
  name: string;
}

export class CategoryResource extends MongoDataSource<CategoryModel> {
  getAllCategories() {
    // access to collection api
    return this.collection.find({}).toArray();
  }

  getCategory(categoryId) {
    // provide caching and batching out of the box
    return this.findOneById(categoryId);
  }
}
