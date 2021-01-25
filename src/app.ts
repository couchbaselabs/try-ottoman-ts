import express, {Request, Response, Error} from 'express';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import {ControllerType} from "./shared/controller.type";

class App {
    public app: express.Application;
    public port: number;

    constructor(controllers: ControllerType[], port: number) {
        this.app = express();
        this.port = port;
        this.app.use(express.json());
        this.app.get('/', (req, res) => {
            res.send('I am ready!!');
        });
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./swagger.yaml')));

        this.app.use((err: Error, req: Request, res: Response, next) => {
            return res.status(500).error({error: err.toString()}).json();
        });
        this.initializeControllers(controllers);
    }

    private initializeControllers(controllers: ControllerType[]) {
        controllers.forEach((controller) => {
            this.app.use(controller.path, controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`API started at http://localhost:${this.port}`);
            console.log(`API docs at http://localhost:${this.port}/api-docs/`);
        });
    }

}

export default App;
