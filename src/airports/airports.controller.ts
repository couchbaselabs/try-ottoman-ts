import express, { Request, Response } from 'express';
import AirportModel from './airports.model';
import makeResponse from '../shared/make.response';
import { FindOptions } from 'ottoman';
import { CustomRoute } from '../shared/custom.route';

class AirportsController extends CustomRoute {

  public router = express.Router();
  public path: string;

  constructor(route: string) {
    super();
    this.path = route;
    this.initRoutes();
  }

  public getAll() {
    this.router.get('/', async (req: Request, res: Response) => {
      await makeResponse(res, async () => {
        const { limit, search, skip } = req.query;
        const options = new FindOptions({ limit: Number(limit || 50), skip: Number(skip || 0) });
        const filter = search ? { airportname: { $like: `%${search}%` } } : {};
        const result = await AirportModel.find(filter, options);
        const { rows: items } = result;
        return {
          items,
        };
      });
    });
  }

  public getById() {
    this.router.get('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, () => AirportModel.findById(req.params.id));
    });
  }

  public post() {
    this.router.post('/', async (req: Request, res: Response) => {
      await makeResponse(res, () => {
        res.status(201);
        const airport = new AirportModel(req.body);
        return airport.save();
      });
    });
  }

  public patch() {
    this.router.patch('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, async () => {
        res.status(204);
        await AirportModel.updateById(req.params.id, req.body);
      });
    });
  }

  public put() {
    this.router.put('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, async () => {
        await AirportModel.replaceById(req.params.id, req.body);
        res.status(204);
      });
    });
  }

  public delete() {
    this.router.delete('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, async () => {
        await AirportModel.removeById(req.params.id);
        res.status(204);
      });
    });
  }

}

export default AirportsController;
