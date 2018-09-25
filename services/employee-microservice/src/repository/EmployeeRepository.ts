import { injectable } from 'inversify'
// import { Repository, Connection } from 'typeorm';
// import { BaseRepository } from './BaseRepository'
import { EmployeeDTO, EmployeesMongoDatabase, EmployeeMongoSchema } from '../schema/EmployeeSchema';

/**
 * Interface for iridium and typeorm database operations on Employee API
 * 
 * @export
 * @interface EmployeeRepository
 */

export interface EmployeeRepository {
    findAll(): Promise<Array<EmployeeDTO>>
    createEmployee(employeeData: EmployeeDTO): Promise<EmployeeDTO>
    deleteEmployee(id: string | number): Promise<number>

}


/**
* Iridium implementation on Employee API
* 
* @export
* @class EmployeeRepositoryMongo
* @implements {EmployeeRepository}
*/

@injectable()
export class EmployeeRepositoryMongo implements EmployeeRepository {

   
    public async findAll(): Promise<Array<EmployeeDTO>> {
        const EmployeeDTOs = await EmployeesMongoDatabase.connect().then(() => EmployeesMongoDatabase.model.find())
        return EmployeeDTOs.toArray()
    }

    /**
    * Create new mongo document for Employee
    * 
    * @param {EmployeeDTO} employeeData 
    * @returns {Promise<EmployeeDTO>} 
    * @memberof EmployeeRepositoryMongo
    */
    public async createEmployee(employeeData: EmployeeDTO): Promise<EmployeeDTO> {
        return await EmployeesMongoDatabase.connect().then(() => {

            return EmployeesMongoDatabase.model.insert(employeeData)
        })

    }

    public async deleteEmployee(id: string | number): Promise<number> {
        return await EmployeesMongoDatabase.connect().then(() => {
            return EmployeesMongoDatabase.model.remove({ _id: id })
        })
    }

}