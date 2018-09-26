"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const EmployeeSchema_1 = require("../schema/EmployeeSchema");
let EmployeeRepositoryMongo = class EmployeeRepositoryMongo {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const EmployeeDTOs = yield EmployeeSchema_1.EmployeesMongoDatabase.connect().then(() => EmployeeSchema_1.EmployeesMongoDatabase.model.find());
            return EmployeeDTOs.toArray();
        });
    }
    createEmployee(employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield EmployeeSchema_1.EmployeesMongoDatabase.connect().then(() => {
                return EmployeeSchema_1.EmployeesMongoDatabase.model.insert(employeeData);
            });
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield EmployeeSchema_1.EmployeesMongoDatabase.connect().then(() => {
                return EmployeeSchema_1.EmployeesMongoDatabase.model.remove({ _id: id });
            });
        });
    }
};
EmployeeRepositoryMongo = __decorate([
    inversify_1.injectable()
], EmployeeRepositoryMongo);
exports.EmployeeRepositoryMongo = EmployeeRepositoryMongo;
//# sourceMappingURL=EmployeeRepository.js.map