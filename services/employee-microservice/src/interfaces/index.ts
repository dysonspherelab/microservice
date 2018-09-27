import * as Bluebird from "bluebird";
import { EmployeeMongoSchema } from "../schema";

/**
 * Interface for Employee Model
 * @export
 * @interface Employee
 */
export interface InterfaceEmployee {
    getEntitity: string;
    GetEmpId: string;
    GetClient_id: string;
    GetEmpName: string;
    GetDept: string;
    GetTeam: string;
    GetManager: string;
    GetCapital: string;
    getId: string;
}

/**
 * Interface for iridium and typeorm database operations on Employee API
 * @export
 * @interface EmployeeRepository
 */

export interface EmployeeRepository {
    findAll(): Promise<EmployeeDTO[]>;
    createEmployee(employeeData: EmployeeDTO): Bluebird<EmployeeMongoSchema>;
    deleteEmployee(id: string | number): Bluebird<number>;

}

/**
 * Interface for Employee Data Transfer Object
 * @export
 * @interface EmployeeDTO
 */
export interface EmployeeDTO {
    _id: string;
    entitity: string;
    empId: string;
    clientId: string;
    empName: string;
    dept: string;
    team: string;
    manager: string;
    capital: string;
}

/**
 * Interface for services on Employee API
 * @export
 * @interface EmployeeService
 */
export interface EmployeeService {
    getEmployees(): Promise<object>;
    createEmployee(employeeData: InterfaceEmployee): Promise<EmployeeDTO | Error>;
    deleteEmployee(id: string | number): Bluebird<number>;
}