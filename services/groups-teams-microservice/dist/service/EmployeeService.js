"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const Employee_1 = require("../model/Employee");
const types_1 = require("../types/types");
let EmployeeServiceImpl = class EmployeeServiceImpl {
    createEmployee(employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeDTO = this.toEmployeeDTO(employeeData);
            const createdDTO = yield this.EmployeeRepositoryMongo.createEmployee(employeeDTO);
            return createdDTO;
        });
    }
    getEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const employeeMongo = yield this.EmployeeRepositoryMongo.findAll().then((a) => a.map((dto) => {
                return this.toEmployee(dto);
            }));
            return employeeMongo;
        });
    }
    deleteEmployee(empId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.EmployeeRepositoryMongo.deleteEmployee(empId);
        });
    }
    toEmployee(employeeDTO) {
        return new Employee_1.Employee(employeeDTO.entitity, employeeDTO.empId, employeeDTO.client_id, employeeDTO.empName, employeeDTO.dept, employeeDTO.team, employeeDTO.manager, employeeDTO.capital, employeeDTO._id.toString());
    }
    toEmployeeDTO(employee) {
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
        };
    }
};
__decorate([
    inversify_1.inject(types_1.default.EmployeeNoSQLRepository),
    __metadata("design:type", Object)
], EmployeeServiceImpl.prototype, "EmployeeRepositoryMongo", void 0);
EmployeeServiceImpl = __decorate([
    inversify_1.injectable()
], EmployeeServiceImpl);
exports.EmployeeServiceImpl = EmployeeServiceImpl;
//# sourceMappingURL=EmployeeService.js.map