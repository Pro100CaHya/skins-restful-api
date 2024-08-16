import fastify, { FastifyInstance } from 'fastify';
import cors from "@fastify/cors";

import { Controller } from 'src/interfaces';
import { errorHandler } from 'src/middlewares';

class Server {
    private app: FastifyInstance;
    private port: number;

    constructor(controllers: Controller[], port: number) {
        this.app = fastify();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
    }

    private initializeMiddlewares() {
        this.app.register(cors, {
            origin: "*"
        });
    }

    private async initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            controller.registerRoutes(this.app, "/api");
        });
    }

    private initializeErrorHandling() {
        this.app.setErrorHandler(errorHandler);
    }

    public startServer() {
        this.app.listen({
           port: this.port 
        }, (err, address) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            console.log(`Server started on ${address}, process PID ${process.pid}`);
        });
    }

    public getAppInstance() {
        return this.app;
    }
}

export { Server };
