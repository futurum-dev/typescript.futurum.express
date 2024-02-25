import http from "http";

import request from 'supertest';

import httpStatus from "http-status";

import path from "path";
import * as fs from "fs";

import Application from './application';
import * as endpoint from "./file-endpoint";

let server: http.Server;

beforeEach(() => {
    server = Application.start("3002");
});

afterEach((done) => {
    server.close(done);
});

describe('POST /api/v1/file/upload-file', () => {
    it('should parse correctly', async () => {
        const inputFilePath = path.join(__dirname, '../test-data/hello-world.txt');

        const inputContent = fs.readFileSync(inputFilePath, 'utf8');

        const expectedResponse: endpoint.UploadFileResponse = {
            fileResponse: {
                fileName: 'hello-world.txt',
                fileContent: inputContent
            }
        };

        const response = await request(server)
            .post('/api/v1/file/upload-file')
            .attach('file', inputFilePath);

        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body).toEqual(expectedResponse);
    });
});

describe('POST /api/v1/file/upload-files', () => {
    it('should parse correctly', async () => {
        const inputFilePath = path.join(__dirname, '../test-data/hello-world.txt');

        const inputContent = fs.readFileSync(inputFilePath, 'utf8');

        const expectedResponse: endpoint.UploadFilesResponse = {
            fileResponses: [
                {
                    fileName: 'hello-world.txt',
                    fileContent: inputContent
                },
                {
                    fileName: 'hello-world.txt',
                    fileContent: inputContent
                }
            ]
        };

        const response = await request(server)
            .post('/api/v1/file/upload-files')
            .attach('files', inputFilePath)
            .attach('files', inputFilePath);

        expect(response.statusCode).toBe(httpStatus.OK);
        expect(response.body).toEqual(expectedResponse);
    });
});
