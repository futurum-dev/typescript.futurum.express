import express, {Router} from "express";
import * as swaggerUi from "swagger-ui-express";

import * as swaggerJson from "@/build/swagger.json";

class OpenApiMiddleware {
    register(router: Router) {
        router.use('/docs', swaggerUi.serve, this.handler);
    }

    private handler(req: express.Request, res: express.Response, next: express.NextFunction) {
        return res.send(swaggerUi.generateHTML(swaggerJson));
    }
}

export default new OpenApiMiddleware();
