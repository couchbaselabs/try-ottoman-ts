import { Ottoman, Couchbase } from 'ottoman';
const dotenv = require('dotenv');
dotenv.config();

const ottoman = new Ottoman({
    modelKey: 'type',
    scopeName: 'inventory'
});

export { ottoman };
