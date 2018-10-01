import * as Bluebird from "bluebird";
// import { EmployeeMongoSchema } from "../schema";

/**
 * Interface for Employee Data Transfer Object
 * @export
 * @interface EmployeeDTO
 */
export interface IEmployee {
    _id?: string | number;
    entitity?: string;
    empId?: string;
    clientId?: string;
    empName?: string;
    dept?: string;
    team?: string;
    manager?: string;
    capital?: string;
}

export interface EmployeeDO {
    getEmployee(): IEmployee;
    addEmployee(): Promise<IEmployee | Error>;
    listEmployees(): Promise<IEmployee[]>;
    removeEmployee(id: string | number): Bluebird<number>;
}

/**
 * Interface for services on Employee API
 * @export
 * @interface EmployeeService
 */
export interface IEmployeeService {
    getEmployees(): Promise<IEmployee[]>;
    createEmployee(employeeData: IEmployee): Promise<IEmployee | Error>;
    deleteEmployee(id: string | number): Bluebird<number>;
}



/**
 * Interface for iridium and typeorm database operations on Employee API
 * @export
 * @interface EmployeeRepository
 */

export interface EmployeeRepository {
    findAll(): any;
    createEmployee(employeeData: IEmployee): any;
    deleteEmployee(id: string | number): any;
}