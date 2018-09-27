import { Instance, Collection, Property, ObjectID } from "iridium";
import { EmployeeDTO } from "../interfaces";

/**
 * Iridium config
 */

@Collection("Employee")
export class EmployeeMongoSchema extends Instance<EmployeeDTO, EmployeeMongoSchema> implements EmployeeDTO {
    @ObjectID
    public _id: string;

    @Property(String, false)
    public entitity: string;

    @Property(String, false)
    public empId: string;

    @Property(String, false)
    public clientId: string;

    @Property(String, false)
    public empName: string;

    @Property(String, false)
    public dept: string;

    @Property(String, false)
    public team: string;

    @Property(String, false)
    public manager: string;

    @Property(String, false)
    public capital: string;
}