"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("./types/types");
const EmployeeController_1 = require("./controller/EmployeeController");
const EmployeeService_1 = require("./service/EmployeeService");
const EmployeeRepository_1 = require("./repository/EmployeeRepository");
const ToJsonService_1 = require("./service/ToJsonService");
const container = new inversify_1.Container();
container.bind(inversify_express_utils_1.TYPE.Controller).to(EmployeeController_1.EmployeeController).whenTargetNamed('EmployeeController');
container.bind(types_1.default.EmployeeService).to(EmployeeService_1.EmployeeServiceImpl);
container.bind(types_1.default.EmployeeNoSQLRepository).to(EmployeeRepository_1.EmployeeRepositoryMongo);
container.bind(types_1.default.ToJsonService).to(ToJsonService_1.ToJsonServiceImpl);
exports.default = container;
//# sourceMappingURL=inversify.config.js.map