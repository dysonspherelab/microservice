"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    constructor(entitity, empId, client_id, empName, dept, team, manager, capital, _id) {
        this.entitity = entitity;
        this.empId = empId;
        this.client_id = client_id;
        this.empName = empName;
        this.dept = dept;
        this.team = team;
        this.manager = manager;
        this.capital = capital;
        this._id = _id;
    }
    get getEntitity() {
        return this.entitity;
    }
    get GetEmpId() {
        return this.empId;
    }
    get GetClient_id() {
        return this.client_id;
    }
    get GetEmpName() {
        return this.empName;
    }
    get GetDept() {
        return this.dept;
    }
    get GetTeam() {
        return this.team;
    }
    get GetManager() {
        return this.manager;
    }
    get GetCapital() {
        return this.capital;
    }
    get getId() {
        return this._id;
    }
}
exports.Employee = Employee;
//# sourceMappingURL=Employee.js.map