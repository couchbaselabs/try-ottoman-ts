import {start} from 'ottoman';
require('./ottoman-global-config');
import App from './app';
import HotelsController from './hotels/hotels.controller';
import AirportsController from './airports/airports.controller';
import FlightController from './flights/flights.controller';

const app = new App(
    [
        new HotelsController('/hotels'),
        new AirportsController('/airports'),
        new FlightController('/flightPaths'),
    ],
    4500
);

start().then(() => {
    console.log('All the indexes were registered');
    app.listen();
}).catch(e => console.log(e));

