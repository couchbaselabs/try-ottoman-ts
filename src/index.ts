import { ottoman } from "./ottoman-global-config";
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

const main = async () => {
  try {
    await ottoman.connect({
      bucketName: 'travel-sample',
      connectionString: 'couchbase://localhost:8091',
      username: 'Administrator',
      password: 'password',
    });
    await ottoman.start();
    app.listen();
  } catch (e) {
    console.log(e)
  }
}

main();



