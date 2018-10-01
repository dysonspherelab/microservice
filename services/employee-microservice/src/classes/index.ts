import { injectable, inject } from "inversify";
import { Core, Model } from "iridium";
import * as Bluebird from "bluebird";

import { IEmployeeService, EmployeeRepository, IEmployee, EmployeeDO } from "../interfaces";
import { EmployeeMongoSchema } from "../schema";
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
    private _id!: string;
    private _employee: IEmployee;
    @inject(TYPES.IEmployeeService) private _employeeService!: IEmployeeService;
    constructor(employeeData: IEmployee) {
        this._employee = this._setEmployee(employeeData);
    }

    private _getEntitity(object: IEmployee): string {
        this._entitity = object.entitity || "";
        return this._entitity;
    }

    private _getEmpId(object: IEmployee): string {
        this._entitity = object.entitity || "";
        return this._empId || "0";
    }

    private _getClient_id(object: IEmployee): string {
        this._entitity = object.entitity || "";
        return this._clientId || "0";
    }

    private _getEmpName(object: IEmployee): string {
        this._entitity = object.entitity || "";
        return this._empName || "";
    }

    private _getDept(object: IEmployee): string {
        this._entitity = object.entitity || "";
        return this._dept || "";
    }

    private _getTeam(object: IEmployee): string {
        this._entitity = object.entitity || "";
        return this._team || "";
    }

    private _getManager(object: IEmployee): string {
        this._entitity = object.entitity || "";
        return this._manager || "";
    }

    private _getCapital(object: IEmployee): string {
        this._entitity = object.entitity || "";
        return this._capital || "";
    }

    private _getId(object: IEmployee): string | number {
        this._entitity = object.entitity || "";
        return this._id || 0;
    }

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
            _id: this._getId(object),
        };
    }

    public getEmployee() {
        return this._employee;
    }

    public addEmployee() {
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
    public async  createEmployee(employeeData: IEmployee): Promise<IEmployee | Error> {
        const createdDTO: IEmployee = await this._employeeRepository.createEmployee(employeeData);
        return createdDTO;
    }

    public async getEmployees(): Promise<IEmployee[]> {
        const employees = await this._employeeRepository.findAll();
        return employees;
    }

    public deleteEmployee(empId: number): Bluebird<number> {
        return this._employeeRepository.deleteEmployee(empId);
    }
}















class EmployeeDatabase extends Core {
    public model = new Model<IEmployee, EmployeeMongoSchema>(this, EmployeeMongoSchema);

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


    public async findAll() {
        const employees = await employeesMongoDatabase.connect().then(() => employeesMongoDatabase.model.find());
        return employees.toArray();
    }

    /**
     * Create new mongo document for Employee
     * @param {EmployeeDTO} employeeData
     * @returns {Promise<EmployeeDTO>}
     * @memberof EmployeeRepositoryMongo
     */
    public createEmployee(employeeData: IEmployee) {
        return employeesMongoDatabase
            .connect()
            .then(() => employeesMongoDatabase.model.insert(employeeData));

    }

    public deleteEmployee(id: string | number) {
        return employeesMongoDatabase
            .connect()
            .then(() => employeesMongoDatabase.model.remove({ _id: id }));
    }

}