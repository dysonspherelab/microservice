import { injectable, inject } from "inversify";
import { Core, Model } from "iridium";
import * as Bluebird from "bluebird";

import { EmployeeService, EmployeeRepository, EmployeeDTO, InterfaceEmployee } from "../interfaces";
import { EmployeeMongoSchema } from "../schema";
import TYPES from "../types/types";
import CONFIG from "../config";

class Employee implements InterfaceEmployee {

    constructor(
        private entitity: string,
        private empId: string,
        private clientId: string,
        private empName: string,
        private dept: string,
        private team: string,
        private manager: string,
        private capital: string,
        private _id: string,
    ) { }
    get getEntitity(): string {
        return this.entitity;
    }

    get GetEmpId(): string {
        return this.empId;
    }

    get GetClient_id(): string {
        return this.clientId;
    }

    get GetEmpName(): string {
        return this.empName;
    }

    get GetDept(): string {
        return this.dept;
    }

    get GetTeam(): string {
        return this.team;
    }

    get GetManager(): string {
        return this.manager;
    }

    get GetCapital(): string {
        return this.capital;
    }

    get getId(): string {
        return this._id;
    }
}

class EmployeeDatabase extends Core {
    public model = new Model<EmployeeDTO, EmployeeMongoSchema>(this, EmployeeMongoSchema);

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


    public async findAll(): Promise<EmployeeDTO[]> {
        const employeeDTOs = await employeesMongoDatabase.connect().then(() => employeesMongoDatabase.model.find());
        return employeeDTOs.toArray();
    }

    /**
     * Create new mongo document for Employee
     * @param {EmployeeDTO} employeeData
     * @returns {Promise<EmployeeDTO>}
     * @memberof EmployeeRepositoryMongo
     */
    public createEmployee(employeeData: EmployeeDTO) {
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

/**
 * EmployeeService interface implementation
 * @export
 * @class EmployeeServiceImpl
 * @implements {EmployeeService}
 */
@injectable()
export class EmployeeServiceImpl implements EmployeeService {

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
    public async  createEmployee(employeeData: Employee): Promise<EmployeeDTO | Error> {
        const employeeDTO: EmployeeDTO = this.toEmployeeDTO(employeeData);

        const createdDTO: EmployeeDTO = await this._employeeRepository.createEmployee(employeeDTO);


        return createdDTO;
    }

    public async getEmployees(): Promise<Employee[]> {
        const employee: Employee[] = await this._employeeRepository.findAll().then((a) => a.map((dto: EmployeeDTO) => {
            return this.toEmployee(dto);
        }));

        return employee;
    }

    public deleteEmployee(empId: number): Bluebird<number> {
        return this._employeeRepository.deleteEmployee(empId);

    }

    /**
     * Converts employee DTO to model
     * @private
     * @param {EmployeeDTO} employeeDTO
     * @returns {Employee}
     * @memberof EmployeeServiceImpl
     */
    private toEmployee(employeeDTO: EmployeeDTO): Employee {
        return new Employee(
            employeeDTO.entitity,
            employeeDTO.empId,
            employeeDTO.clientId,
            employeeDTO.empName,
            employeeDTO.dept,
            employeeDTO.team,
            employeeDTO.manager,
            employeeDTO.capital,
            employeeDTO._id
        );
    }


    /**
     * Converts employee model to DTO
     * @private
     * @param {Employee} employee
     * @returns {EmployeeDTO}
     * @memberof EmployeeServiceImpl
     */
    private toEmployeeDTO(employee: Employee): EmployeeDTO {
        return {
            entitity: employee.getEntitity,
            empId: employee.GetEmpId,
            clientId: employee.GetClient_id,
            empName: employee.GetEmpName,
            dept: employee.GetDept,
            team: employee.GetTeam,
            manager: employee.GetManager,
            capital: employee.GetCapital,
            _id: employee.getId,

        };
    }
}