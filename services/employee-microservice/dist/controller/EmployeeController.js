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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const BaseController_1 = require("./BaseController");
const inversify_1 = require("inversify");
const express = require("express");
const inversify_express_utils_1 = require("inversify-express-utils");
const Employee_1 = require("../model/Employee");
const types_1 = require("../types/types");
let EmployeeController = class EmployeeController extends BaseController_1.BaseController {
    constructor(employeeService, toJsonService) {
        super();
        this.employeeService = employeeService;
        this.toJsonService = toJsonService;
    }
    createEmployee(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (JSON.stringify(req.files) != '{}') {
                return this.toJsonService.getJsondata(req.files.file[0])
                    .then((data) => {
                    data.forEach(empObj => {
                        let employee = new Employee_1.Employee(empObj.entity, empObj.emp_id, empObj.client_id, empObj.name, empObj.dept, empObj.team, empObj.manager, empObj.capital);
                        var createdEmployee = this.employeeService.createEmployee(employee);
                    });
                    this.renderJSON(req, res, { message: "success" }, 201);
                }).catch(err => {
                    return err;
                });
            }
            else {
                this.renderJSON(req, res, { message: "No file Choosen" }, 201);
            }
        });
    }
    getEmployees(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield this.employeeService.getEmployees().catch(err => console.log(err));
            return this.renderJSON(req, res, { Employee: employee });
        });
    }
    userDelete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var employeeid = req.params.employeeid;
            const dltEmployee = yield this.employeeService.deleteEmployee(employeeid).catch(err => console.log(err));
            return this.renderJSON(req, res, { Message: "Deleted Successfully" }, 201);
        });
    }
};
__decorate([
    inversify_express_utils_1.httpPost('/employee'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "createEmployee", null);
__decorate([
    inversify_express_utils_1.httpGet('/employee'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployees", null);
__decorate([
    inversify_express_utils_1.httpDelete('/employee/:employeeid'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "userDelete", null);
EmployeeController = __decorate([
    inversify_express_utils_1.controller('/admin'),
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.EmployeeService)),
    __param(1, inversify_1.inject(types_1.default.ToJsonService)),
    __metadata("design:paramtypes", [Object, Object])
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=EmployeeController.js.map