import http from "http";

import request from 'supertest';

import httpStatus from "http-status";

import Application from './application';

let server: http.Server;

beforeEach(() => {
    server = Application.start("3002");
});

afterEach((done) => {
    server.close(done);
});

describe('GET /api/v1/greeting/hello', () => {
    it('should correctly return', async () => {
        const name = 'world';

        const response = await request(server)
            .get(`/api/v1/greeting/hello/${name}`);

        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body).toEqual({ message: `Hello ${name}` });
    });
});

describe('GET /api/v1/greeting/goodbye', () => {
    it('should correctly return', async () => {
        const name = 'world';

        const response = await request(server)
            .get(`/api/v1/greeting/goodbye/${name}`);

        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body).toEqual({ message: `Goodbye ${name}` });
    });
});
