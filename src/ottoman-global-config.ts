const { Ottoman } = require('ottoman');
const dotenv = require('dotenv');
dotenv.config();

const ottoman = new Ottoman({
  modelKey: 'type',
  collectionName: '_default',
  keyGeneratorDelimiter: '_'
});

ottoman.connect({
  bucketName: 'travel-sample',
  connectionString: 'couchbase://localhost:8091',
  username: 'Administrator',
  password: 'password'
});
