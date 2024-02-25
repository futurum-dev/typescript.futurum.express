import {
    Get,
    Path,
    Response,
    Route,
    SuccessResponse
} from "tsoa";
import {ProblemDocument} from "http-problem-details";

import ProvideSingleton from "@/ioc/provide-singleton";
import Endpoint from "@/core/endpoint";

interface GreetingResponse {
    message: string
}

@Route("greeting")
@ProvideSingleton(GreetingEndpoint)
export class GreetingEndpoint extends Endpoint {

    @Get("hello/:name")
    @SuccessResponse("200")
    @Response<ProblemDocument>("500")
    public async helloHandler(@Path('name') name: string): Promise<GreetingResponse> {
        return {
            message: `Hello ${name}`
        };
    }

    @Get("goodbye/:name")
    @SuccessResponse("200")
    @Response<ProblemDocument>("500")
    public async goodbyeHandler(@Path('name') name: string): Promise<GreetingResponse> {
        return {
            message: `Goodbye ${name}`
        };
    }
}
