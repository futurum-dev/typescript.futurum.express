import {
    Get,
    Response,
    Route,
    SuccessResponse
} from "tsoa";
import {ProblemDocument} from "http-problem-details";

import ProvideSingleton from "@/ioc/provide-singleton";
import Endpoint from "@/core/endpoint";

@Route("error")
@ProvideSingleton(ErrorEndpoint)
export class ErrorEndpoint extends Endpoint {

    @Get()
    @SuccessResponse("200")
    @Response<ProblemDocument>("500")
    public handler(): void {
        throw new Error("We have an error");
    }
}
