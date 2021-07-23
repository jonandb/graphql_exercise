import { MongoClient, Db } from 'mongodb';

const uri = 'mongodb://localhost:27017/northwind';

export const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const openDB = async (): Promise<MongoClient> => {
  await client.connect();
  return client;
};

export const closeDB = () => {
  client.close();
};

export { Db };
