import express, {json, urlencoded} from "express";

import dotenv from 'dotenv';

import cors from 'cors';
// import helmet from "helmet";
import morgan from 'morgan';

import {RegisterRoutes} from "@/build/routes";

import ErrorMiddleware from "@/middleware/error-middleware";
import OpenApiMiddleware from "@/middleware/open-api-middleware";

class Application {
    public start(port: string) {
        const expressApp = express();

        // Load variables from .env file
        dotenv.config();

        expressApp.use(cors());
        // expressApp.use(helmet());

        // Use body parser to read sent json payloads
        expressApp.use(
            urlencoded({
                extended: true,
            })
        );
        expressApp.use(json());

        expressApp.use(morgan('dev'));

        // Register TSOA generated API routes - *AFTER* payload parsed
        RegisterRoutes(expressApp);

        ErrorMiddleware.register(expressApp);

        OpenApiMiddleware.register(expressApp);

        return expressApp.listen(port, () => {
            console.log(`[APPLICATION] Running at http://localhost:${port}`);
            console.log(`[APPLICATION] Swagger available at http://localhost:${port}/docs`);
        });
    }
}

export default new Application();
