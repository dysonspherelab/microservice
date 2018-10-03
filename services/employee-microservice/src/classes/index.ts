import "reflect-metadata";
import { injectable, inject } from "inversify";
import * as Bluebird from "bluebird";
import { IEmployeeService, EmployeeRepository, IEmployee, EmployeeDO } from "../interfaces";
import { EmployeeDatabase } from "../schema";
import TYPES from "../types/types";
import CONFIG from "../config";




@injectable()
export class Employee implements EmployeeDO {
    private _entitity!: string;
    private _empId!: string;
    private _clientId!: string;
    private _empName!: string;
    private _dept!: string;
    private _team!: string;
    private _manager!: string;
    private _capital!: string;
    private _employee: IEmployee;
    @inject(TYPES.IEmployeeService) private _employeeService!: IEmployeeService;
    constructor() {
        this._employee = this._setEmployee({});
    }

    private _getEntitity(object: IEmployee): string {
        this._entitity = object.entitity || "";
        return this._entitity;
    }

    private _getEmpId(object: IEmployee): string {
        this._empId = object.empId || "";
        return this._empId || "0";
    }

    private _getClient_id(object: IEmployee): string {
        this._clientId = object.clientId || "";
        return this._clientId || "0";
    }

    private _getEmpName(object: IEmployee): string {
        this._empName = object.empName || "";
        return this._empName || "";
    }

    private _getDept(object: IEmployee): string {
        this._dept = object.dept || "";
        return this._dept || "";
    }

    private _getTeam(object: IEmployee): string {
        this._team = object.team || "";
        return this._team || "";
    }

    private _getManager(object: IEmployee): string {
        this._manager = object.manager || "";
        return this._manager || "";
    }

    private _getCapital(object: IEmployee): string {
        this._capital = object.capital || "";
        return this._capital || "";
    }

    // private _getId(object: IEmployee) {}

    private _setEmployee(object: IEmployee) {
        return {
            entitity: this._getEntitity(object),
            empId: this._getEmpId(object),
            clientId: this._getClient_id(object),
            empName: this._getEmpName(object),
            dept: this._getDept(object),
            team: this._getTeam(object),
            manager: this._getManager(object),
            capital: this._getCapital(object),
        };
    }

    public getEmployee(id: string) {
        return this._employeeService.getEmployees(id)
        .then(arr => arr[0]);
    }

    public addEmployee(employeeData: IEmployee) {
        this._employee = this._setEmployee(employeeData);
        return this._employeeService.createEmployee(this._employee);
    }

    public listEmployees() {
        return this._employeeService.getEmployees();
    }

    public removeEmployee(id: number) {
        return this._employeeService.deleteEmployee(id);
    }
}












/**
 * EmployeeService interface implementation
 * @export
 * @class EmployeeServiceImpl
 * @implements {EmployeeService}
 */
@injectable()
export class EmployeeService implements IEmployeeService {

    /**
     * Using inversify bindings sets the repository implementation
     * @private
     * @type {EmployeeRepository}
     * @memberof EmployeeServiceImpl
     */
    private _employeeRepository: EmployeeRepository;

    constructor(@inject(TYPES.EmployeeRepository) employeeRepository: EmployeeRepository) {
        this._employeeRepository = employeeRepository;
    }

    /**
     * Creates a new Employee
     * @param {Employee} employeeData
     * @returns {(Promise<Employee|Error>)}
     * @memberof EmployeeServiceImpl
     */
    public async createEmployee(employeeData: IEmployee): Promise<IEmployee | Error> {
        const createdDTO: IEmployee = await this._employeeRepository.createEmployee(employeeData);
        return createdDTO;
    }

    public async getEmployees(id?: string): Promise<IEmployee[]> {
        const employees = await this._employeeRepository.findAll({ _id: id });
        return employees;
    }

    public deleteEmployee(empId: number): Bluebird<number> {
        return this._employeeRepository.deleteEmployee(empId);
    }
}






const employeesMongoDatabase = new EmployeeDatabase(CONFIG.mongo());

/**
 * Iridium implementation on Employee API
 * @export
 * @class EmployeeRepositoryMongo
 * @implements {EmployeeRepository}
 */

@injectable()
export class EmployeeRepositoryMongo implements EmployeeRepository {


    public findAll(cond?: object) {
        return employeesMongoDatabase.model.find(cond);
    }

    /**
     * Create new mongo document for Employee
     * @param {IEmployee} employeeData
     * @returns Promise<Document>
     * @memberof EmployeeRepositoryMongo
     */
    public createEmployee(employeeData: IEmployee) {
        return employeesMongoDatabase.model.create(employeeData);
    }

    public deleteEmployee(id: string | number) {
        return employeesMongoDatabase.model.remove({ _id: id });
    }

}