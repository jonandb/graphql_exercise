const fs = require('fs');
const { MongoClient, ObjectID } = require('mongodb');

const collectionPrefix = '';

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

function sanitizeObjectIds(array) {
  array.forEach((item) => {
    convertObjectIds(item);
  });
}

function convertObjectIds(item) {
  for (const property in item) {
    if (typeof item[property] === 'string' && item[property].length === 24 && !item[property].includes(' ')) {
      item[property] = new ObjectID(item[property]);
    }
    if (Array.isArray(item[property])) {
      item[property].forEach((el) => {
        convertObjectIds(el);
      });
    }
  }
}

async function seed() {
  await client.connect();
  const db = client.db('northwind');
  const files = ['categories', 'customers', 'employees', 'orders', 'products', 'regions', 'shippers', 'suppliers'];

  const collectionNames = (await db.listCollections().toArray()).map((o) => o.name);

  return Promise.all(
    files.map((file) => {
      return (async function () {
        const colName = `${collectionPrefix || ''}${file}`;
        const data = JSON.parse(fs.readFileSync(`${__dirname}/collections/${file}.json`, 'utf8'));
        if (collectionNames.indexOf(colName) > -1) {
          console.log(`  '${colName}' dropped`);
          await db.dropCollection(colName);
        }
        sanitizeObjectIds(data);
        const result = await db.collection(colName).insertMany(data);
        console.log(`  '${colName}' created with ${result.insertedCount} records`);
      })();
    }),
  );
}

seed()
  .then(() => {
    console.log('success');
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    client.close();
  });
