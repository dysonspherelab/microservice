import { BaseController } from './BaseController'
import { injectable, inject } from 'inversify';
import * as express from 'express'
import colors = require('colors')
import { interfaces, controller, httpGet, httpPost, httpDelete, httpPut } from 'inversify-express-utils';
import { FixtureService } from '../service/FixtureService';
import { Fixture } from '../model/Fixture';

import TYPES from '../types/types'
import { ToJsonService } from '../service/ToJsonService';

@controller('/admin')
@injectable()
export class FixtureController extends BaseController implements interfaces.Controller {

    private fixtureService: FixtureService
    private toJsonService: ToJsonService


    /**
     * Creates an instance of SchemaTestController.
     * @constructor SchemaTestController
     */
    constructor(@inject(TYPES.FixtureService) fixtureService: FixtureService,
        @inject(TYPES.ToJsonService) toJsonService: ToJsonService) {
        //constructor() {
        super()
        this.fixtureService = fixtureService
        this.toJsonService = toJsonService
    }

    /**
     * Create a new Fixture with passed req body params defined as in the json schema
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @returns 
     * @memberof FixtureController
     */
    @httpPost('/fixture')
    public async createFixture(req: any, res: express.Response, next: express.NextFunction) {

        if (JSON.stringify(req.files) != '{}') {
            return this.toJsonService.getJsondata(req.files.file[0])
                .then((data: any) => {
                    data.forEach(fixtureObj => {
                        console.log("fixtureObj", fixtureObj)
                        let fixture = new Fixture(
                            fixtureObj.week,
                            fixtureObj.team1_id,
                            fixtureObj.team2_id,
                        )
                        var createdFixture = this.fixtureService.createFixture(fixture)
                    });
                    this.renderJSON(req, res, { message: "success" }, 201)
                }).catch(err => {
                    return err
                })

        }
        else {
            this.renderJSON(req, res, { message: "No file Choosen" }, 201)
        }
    }

    @httpGet('/fixture')
    private async getFixtures(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
        const fixtures = await this.fixtureService.getFixtures().catch(err => console.log(err))
        return this.renderJSON(req, res, { Fixtures: fixtures })
    }

}
