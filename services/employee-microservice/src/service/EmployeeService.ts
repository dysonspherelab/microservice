import { injectable, inject } from 'inversify'

import { Employee } from '../model/Employee';


import { EmployeeRepository } from "../repository/EmployeeRepository"

import TYPES from '../types/types'

import { EmployeeDTO } from '../schema/EmployeeSchema'




/**
 * Interface for services on Employee API
 * 
 * @export
 * @interface EmployeeService
 */
export interface EmployeeService {
    getEmployees(): Promise<object>
    createEmployee(employeeData: Employee): Promise<EmployeeDTO | Error>
    deleteEmployee(id: string | number): Promise<number>

}

/**
 * EmployeeService interface implementation
 * 
 * @export
 * @class EmployeeServiceImpl
 * @implements {EmployeeService}
 */
@injectable()
export class EmployeeServiceImpl implements EmployeeService {

    /**
     * Using inversify bindings sets the mongo repository implementation
     * 
     * @private
     * @type {EmployeeRepository}
     * @memberof EmployeeServiceImpl
     */
    @inject(TYPES.EmployeeNoSQLRepository)
    private EmployeeRepositoryMongo: EmployeeRepository

    /**
     * Creates a new Employee 
     * 
     * @param {Employee} employeeData 
     * @returns {(Promise<Employee|Error>)} 
     * @memberof EmployeeServiceImpl
     */
    public async  createEmployee(employeeData: Employee): Promise<EmployeeDTO | Error> {
        const employeeDTO: EmployeeDTO = this.toEmployeeDTO(employeeData);

        const createdDTO: EmployeeDTO = await this.EmployeeRepositoryMongo.createEmployee(employeeDTO);


        return createdDTO
    }

    public async getEmployees(): Promise<Array<Employee>> {
        const employeeMongo: Array<Employee> = await this.EmployeeRepositoryMongo.findAll().then((a) => a.map((dto: EmployeeDTO) => {
            return this.toEmployee(dto);
        }));

        return employeeMongo
    }

    public async deleteEmployee(empId): Promise<number> {
      return await this.EmployeeRepositoryMongo.deleteEmployee(empId)
       
    }




    /**
     * Converts employee DTO to model
     * 
     * @private
     * @param {EmployeeDTO} employeeDTO 
     * @returns {Employee} 
     * @memberof EmployeeServiceImpl
     */
    private toEmployee(employeeDTO: EmployeeDTO): Employee {
        return new Employee(
            employeeDTO.entitity,
            employeeDTO.empId,
            employeeDTO.client_id,
            employeeDTO.empName,
            employeeDTO.dept,
            employeeDTO.team,
            employeeDTO.manager,
            employeeDTO.capital,
            employeeDTO._id.toString()
        )
    }


    /**
     * Converts employee model to DTO
     * 
     * @private
     * @param {Employee} employee 
     * @returns {EmployeeDTO} 
     * @memberof EmployeeServiceImpl
     */
    private toEmployeeDTO(employee: Employee): EmployeeDTO {
        return {
            entitity: employee.getEntitity,
            empId: employee.GetEmpId,
            client_id: employee.GetClient_id,
            empName: employee.GetEmpName,
            dept: employee.GetDept,
            team: employee.GetTeam,
            manager: employee.GetManager,
            capital: employee.GetCapital,
            _id: employee.getId,

        }
    }
}