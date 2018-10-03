// import { IEmployee } from "../interfaces";
import mongoose =  require("mongoose");
/**
 * Mongoose schema
 */

const employeeSchema = new mongoose.Schema({
    entitity: String,
    empId: String,
    clientId: String,
    empname: String,
    dept: String,
    team: String,
    manager: String,
    capital: String,
});


export class EmployeeDatabase {
    private _config: string;
    constructor(config: string) {
        this._config = config;
        mongoose.connect(this._config);
    }
    public model = mongoose.model("Employee", employeeSchema);
}