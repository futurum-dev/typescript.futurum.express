import {Response, Request, NextFunction, Router} from "express";

import {ProblemDocument} from "http-problem-details";
import httpStatus from "http-status";

import ApplicationException from "@/core/application-exception";

class ErrorMiddleware {
    register(router: Router) {
        router.use(this.handler);
    }

    handler(error: unknown, req: Request, res: Response, next: NextFunction) {
        if (error instanceof ApplicationException) {
            console.error(error);

            res.status(error.statusCode)
                .json(
                    new ProblemDocument({
                        type: ApplicationException.name,
                        title: error.message,
                        detail: error.stack,
                        status: error.statusCode,
                        instance: req.url
                    })
                );
        }

        if (error instanceof Error) {
            console.error(error);

            res.status(httpStatus.INTERNAL_SERVER_ERROR)
                .json(
                    new ProblemDocument({
                        type: 'INTERNAL_SERVER_ERROR',
                        title: error.message,
                        detail: error.stack,
                        status: httpStatus.INTERNAL_SERVER_ERROR,
                        instance: req.url
                    })
                );
        }

        return next;
    }
}

export default new ErrorMiddleware();
