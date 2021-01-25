import {Schema, model} from 'ottoman';

const FlightSchema = new Schema({
    day: Number,
    flight: String,
    utc: String,
});

const RouteSchema = new Schema({
    airline: String,
    airlineid: String,
    destinationairport: String,
    distance: Number,
    equipment: String,
    id: String,
    schedule: [FlightSchema],
    sourceairport: String,
    stops: Number,
    type: String,
});

const FlightModel = model('route', RouteSchema);

export default FlightModel;
