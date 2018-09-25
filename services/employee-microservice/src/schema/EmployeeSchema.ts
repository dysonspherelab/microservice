import { Core, Model, Instance, Collection, Index, Property, ObjectID } from 'iridium';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

import CONFIG from '../config'


export interface EmployeeDTO {
    _id?: string;
    entitity?:string;
    empId?: string;
    client_id?:string;
    empName?: string;
    dept?:string;
    team?:string;
    manager?:string;
    capital?:string;
}

/**
* Iridium config
*/

@Collection('Employee')
export class EmployeeMongoSchema extends Instance<EmployeeDTO, EmployeeMongoSchema> implements EmployeeDTO {
    @ObjectID
    public _id: string;

    @Property(String, false)
    public entitity: string;

    @Property(String, false)
    public empId: string;

    @Property(String, false)
    public client_id?:string;

    @Property(String, false)
    public empName: string;

    @Property(String, false)
    public dept: string;

    @Property(String, false)
    public team: string;

    @Property(String, false)
    public manager?:string;

    @Property(String, false)
    public capital?:string;

    
    

}

class EmployeeDatabase extends Core {
    public model = new Model<EmployeeDTO, EmployeeMongoSchema>(this, EmployeeMongoSchema);

}

export const EmployeesMongoDatabase = new EmployeeDatabase(CONFIG.mongo());



