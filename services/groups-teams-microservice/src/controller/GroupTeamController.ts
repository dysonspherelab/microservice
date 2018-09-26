import { BaseController } from './BaseController'
import { injectable, inject } from 'inversify';
import * as express from 'express'
import colors = require('colors')
import { interfaces, controller, httpGet, httpPost, httpDelete, httpPut } from 'inversify-express-utils';
import { GroupTeamService } from '../service/GroupTeamService';
import { ToJsonService } from '../service/ToJsonService';
import { GroupTeamDTO, GroupTeamsMongoDatabase, } from '../schema/GroupTeamSchema';
import { GroupTeam } from '../model/GroupTeam';

import TYPES from '../types/types'


/**
 * Controller class for GroupTeam API
 * 
 * @export
 * @class GroupTeamController
 * @extends {BaseController}
 * @implements {interfaces.Controller}
 */


@controller('/admin')
@injectable()
export class GroupTeamController extends BaseController implements interfaces.Controller {

    private groupTeamService: GroupTeamService
    private toJsonService: ToJsonService



    /**
     * Creates an instance of SchemaTestController.
     * @constructor SchemaTestController
     */
    constructor(@inject(TYPES.GroupTeamService) groupTeamService: GroupTeamService,
    @inject(TYPES.ToJsonService) toJsonService: ToJsonService) {
        //constructor() {
        super()
        this.groupTeamService = groupTeamService
        this.toJsonService= toJsonService

    }

    /**
     * Create a new GroupTeam with passed req body params defined as in the json schema
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @returns 
     * @memberof GroupTeamController
     */
    @httpPost('/groupteam')
    public async createGroupTeam(req: any, res: express.Response, next: express.NextFunction) {

        if (JSON.stringify(req.files) != '{}') {
            return this.toJsonService.getJsondata(req.files.file[0])
                .then((data: any) => {
                    data.forEach(groupObj => {
                        let name = groupObj['group name'];
                        delete groupObj['group name'];

                        var op = [];
                        Object.keys(groupObj).forEach(function (key) {
                            var obj = {};
                            obj[key] = groupObj[key];
                            op.push(obj);
                        });
                        let groupTeams = new GroupTeam(
                            name,
                            op
                        )
                        var createdGroupTeam = this.groupTeamService.createGroupTeam(groupTeams)

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

    @httpGet('/groupteam')
    private async getGroup_Team(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
        const group_Team = await this.groupTeamService.getGroup_Team().catch(err => console.log(err))
        return this.renderJSON(req, res, { Group_Team: group_Team })
    }

}


