import Express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { SwaggerConfig } from './modules/shared/infrastructure/config/swagger';
import { version } from '../package.json';

export class App {
    private app: Express.Application;
    private port: number | string;
    private docs: SwaggerConfig;

    constructor() {
        this.app = Express();
        this.port = process.env.PORT || 3000;
        this.docs = new SwaggerConfig(version);

        this.initializeMiddlewares();
        this.initializeDocs();
    }

    private initializeMiddlewares() {
        this.app.use(Express.urlencoded({ 
            extended: true 
        }));
        this.app.use(morgan('dev'));
        this.app.use(cookieParser());
    }

    private initializeDocs() {
        this.app.use('/docs', this.docs.setup.serve, this.docs.setup.setup(this.docs.spec));
    }

    public listen() {
        this.app.listen(this.port);
        console.log(`Server running http://localhost:${this.port} 🚀`);
    }

    public get server(): Express.Application {
        return this.app;
    }
}