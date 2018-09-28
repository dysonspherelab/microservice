import { BaseController } from "./BaseController";
import { injectable, inject } from "inversify";
import { Request, Response, NextFunction } from "express";
import { interfaces, controller, httpGet, httpPost, httpDelete, httpPut } from "inversify-express-utils";
import { amqpRPC } from "../rpc/client";

@controller("/test")
@injectable()
export class Controller extends BaseController implements interfaces.Controller {

    // private toJsonService: ToJsonService;


    /**
     * Creates an instance of SchemaTestController.
     * @constructor SchemaTestController
     */
    constructor() {
        // constructor() {
        super();
        // this.toJsonService = toJsonService;
    }

    @httpGet("/endpoint/:number")
    endpoint(req: Request, res: Response, next: NextFunction) {
        amqpRPC(req.params.number, (str) => {
            return this.renderJSON(req, res, { message: str.toString() }, 200);
        });
    }

}
