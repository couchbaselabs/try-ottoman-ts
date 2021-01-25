import {Ottoman} from 'ottoman';
import {config} from 'dotenv';

config();

const ottoman = new Ottoman({collectionName: '_default'});
ottoman.connect('couchbase://localhost/travel-sample@Administrator:password')
