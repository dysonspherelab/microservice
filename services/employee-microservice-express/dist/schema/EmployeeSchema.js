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
Object.defineProperty(exports, "__esModule", { value: true });
const iridium_1 = require("iridium");
const config_1 = require("../config");
let EmployeeMongoSchema = class EmployeeMongoSchema extends iridium_1.Instance {
};
__decorate([
    iridium_1.ObjectID,
    __metadata("design:type", String)
], EmployeeMongoSchema.prototype, "_id", void 0);
__decorate([
    iridium_1.Property(String, false),
    __metadata("design:type", String)
], EmployeeMongoSchema.prototype, "entitity", void 0);
__decorate([
    iridium_1.Property(String, false),
    __metadata("design:type", String)
], EmployeeMongoSchema.prototype, "empId", void 0);
__decorate([
    iridium_1.Property(String, false),
    __metadata("design:type", String)
], EmployeeMongoSchema.prototype, "client_id", void 0);
__decorate([
    iridium_1.Property(String, false),
    __metadata("design:type", String)
], EmployeeMongoSchema.prototype, "empName", void 0);
__decorate([
    iridium_1.Property(String, false),
    __metadata("design:type", String)
], EmployeeMongoSchema.prototype, "dept", void 0);
__decorate([
    iridium_1.Property(String, false),
    __metadata("design:type", String)
], EmployeeMongoSchema.prototype, "team", void 0);
__decorate([
    iridium_1.Property(String, false),
    __metadata("design:type", String)
], EmployeeMongoSchema.prototype, "manager", void 0);
__decorate([
    iridium_1.Property(String, false),
    __metadata("design:type", String)
], EmployeeMongoSchema.prototype, "capital", void 0);
EmployeeMongoSchema = __decorate([
    iridium_1.Collection('Employee')
], EmployeeMongoSchema);
exports.EmployeeMongoSchema = EmployeeMongoSchema;
class EmployeeDatabase extends iridium_1.Core {
    constructor() {
        super(...arguments);
        this.model = new iridium_1.Model(this, EmployeeMongoSchema);
    }
}
exports.EmployeesMongoDatabase = new EmployeeDatabase(config_1.default.mongo());
//# sourceMappingURL=EmployeeSchema.js.map