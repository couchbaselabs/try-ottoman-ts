import {Schema} from 'ottoman';

const GeolocationSchema = new Schema({
    alt: Number,
    lat: {type: Number, required: true},
    lon: {type: Number, required: true},
    accuracy: String,
});

export default GeolocationSchema;
