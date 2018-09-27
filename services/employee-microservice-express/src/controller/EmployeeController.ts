import { BaseController } from './BaseController'
import { injectable, inject } from 'inversify';
import * as express from 'express'
import colors = require('colors')
import { interfaces, controller, httpGet, httpPost, httpDelete, httpPut } from 'inversify-express-utils';
import { EmployeeService } from '../service/EmployeeService';
import { Employee } from '../model/Employee';

import TYPES from '../types/types'
import { ToJsonService } from '../service/ToJsonService';

@controller('/admin')
@injectable()
export class EmployeeController extends BaseController implements interfaces.Controller {

    private employeeService: EmployeeService
    private toJsonService: ToJsonService


    /**
     * Creates an instance of SchemaTestController.
     * @constructor SchemaTestController
     */
    constructor(@inject(TYPES.EmployeeService) employeeService: EmployeeService,
     @inject(TYPES.ToJsonService) toJsonService: ToJsonService) {
        //constructor() {
        super()
        this.employeeService = employeeService
        this.toJsonService= toJsonService
    }

    /**
     * Create a new Employee with passed req body params defined as in the json schema
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     * @returns 
     * @memberof EmployeeController
     */
    @httpPost('/employee')
    public async createEmployee(req: any, res: express.Response, next: express.NextFunction) {

        if (JSON.stringify(req.files) != '{}') {
            return this.toJsonService.getJsondata(req.files.file[0])
                .then((data: any) => {
                    data.forEach(empObj => {
                        let employee = new Employee(
                            empObj.entity,
                            empObj.emp_id,
                            empObj.client_id,
                            empObj.name,
                            empObj.dept,
                            empObj.team,
                            empObj.manager,
                            empObj.capital

                        )
                        var createdEmployee = this.employeeService.createEmployee(employee)
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


    @httpGet('/employee')
    private async getEmployees(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
        const employee = await this.employeeService.getEmployees().catch(err => console.log(err))
        return this.renderJSON(req, res, { Employee: employee })
    }

    @httpDelete('/employee/:employeeid')
    private async userDelete(req: express.Request, res: express.Response, next: express.NextFunction): Promise<express.Response> {
        var employeeid = req.params.employeeid;
        const dltEmployee = await this.employeeService.deleteEmployee(employeeid).catch(err => console.log(err))
        return this.renderJSON(req, res, { Message: "Deleted Successfully" }, 201)
    }

}
