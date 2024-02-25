import http from "http";

import request from 'supertest';

import httpStatus from "http-status";

import Application from './application';
import {ProblemDocument} from "http-problem-details";

let server: http.Server;

beforeEach(() => {
    server = Application.start("3002");
});

afterEach((done) => {
    server.close(done);
});

describe('GET /api/v1/error', () => {
    it('should correctly return', async () => {
        const response = await request(server)
            .get('/api/v1/error');

        expect(response.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
        expect(response.body).toEqual(
            new ProblemDocument({
                type: 'INTERNAL_SERVER_ERROR',
                title: `We have an error`,
                detail: "Error: We have an error\n" +
                    "    at ErrorEndpoint.handler (/Users/neo/Dropbox/projects/git/futurum.dev/typescript.futurum.express/src/error-endpoint.ts:20:15)\n" +
                    "    at /Users/neo/Dropbox/projects/git/futurum.dev/typescript.futurum.express/build/routes.ts:248:50\n" +
                    "    at Generator.next (<anonymous>)\n" +
                    "    at fulfilled (/Users/neo/Dropbox/projects/git/futurum.dev/typescript.futurum.express/build/routes.ts:5:58)\n" +
                    "    at processTicksAndRejections (node:internal/process/task_queues:95:5)",
                status: httpStatus.INTERNAL_SERVER_ERROR,
                instance: '/api/v1/error'
            }));
    });
});
