import {
    Get,
    Post,
    Response,
    Route,
    SuccessResponse,
    UploadedFile,
    UploadedFiles
} from "tsoa";

import {ProblemDocument} from "http-problem-details";

import path from "path";
import * as fs from "fs";
import {Readable} from "stream";

import ProvideSingleton from "@/ioc/provide-singleton";
import Endpoint from "@/core/endpoint";

interface FileResponse {
    fileName: string
    fileContent: string
}

export interface UploadFileResponse {
    fileResponse: FileResponse
}

export interface UploadFilesResponse {
    fileResponses: FileResponse[]
}

@Route("file")
@ProvideSingleton(FileEndpoint)
export class FileEndpoint extends Endpoint {

    @Get("download")
    @SuccessResponse("200", '', "application/octet-stream")
    @Response<ProblemDocument>("500")
    public async downloadHandler(): Promise<Readable> {

        const filePath = path.join(__dirname, '../test-data/hello-world.txt');

        this.setHeader('Content-Type', 'application/octet-stream');

        return fs.createReadStream(filePath);
    }

    @Post("upload-file")
    @Response<ProblemDocument>("500")
    public async uploadFileHandler(
        @UploadedFile() file: Express.Multer.File
    ): Promise<UploadFileResponse> {
        console.log(file);

        return {
            fileResponse: {
                fileName: file.originalname,
                fileContent: file.buffer.toString('utf8')
            }
        };
    }

    @Post("upload-files")
    @Response<ProblemDocument>("500")
    public async uploadFilesHandler(
        @UploadedFiles() files: Express.Multer.File[]
    ): Promise<UploadFilesResponse> {
        console.log(files);

        return {
            fileResponses: files.map(file => {
                return {
                    fileName: file.originalname,
                    fileContent: file.buffer.toString('utf8')
                }
            })
        };
    }
}
