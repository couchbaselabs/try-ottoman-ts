import express, { Request, Response } from 'express';
import HotelModel from './hotels.model';
import makeResponse from '../shared/make.response';
import { FindOptions } from 'ottoman';
import { CustomRoute } from '../shared/custom.route';

class HotelsController extends CustomRoute {

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
        const options = new FindOptions({
          limit: Number(req.query.limit || 50),
          skip: Number(req.query.skip || 0)
        });
        const filter = req.query.search ? { name: { $like: `%${req.query.search}%` } } : {};
        const result = await HotelModel.find(filter, options);
        const { rows: items } = result;
        return {
          items,
        };
      });
    });
  }

  public getById() {
    this.router.get('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, () => HotelModel.findById(req.params.id));
    });
  }

  public post() {
    this.router.post('/', async (req: Request, res: Response) => {
      await makeResponse(res, () => {
        res.status(201);
        const hotel = new HotelModel(req.body);
        return hotel.save();
      });
    });
  }

  public patch() {
    this.router.patch('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, async () => {
        res.status(204);
        await HotelModel.updateById(req.params.id, req.body);
      });
    });
  }

  public put() {
    this.router.put('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, async () => {
        await HotelModel.replaceById(req.params.id, req.body);
        res.status(204);
      });
    });
  }

  public delete() {
    this.router.delete('/:id', async (req: Request, res: Response) => {
      await makeResponse(res, async () => {
        await HotelModel.removeById(req.params.id);
        res.status(204);
      });
    });
  }

}

export default HotelsController;
