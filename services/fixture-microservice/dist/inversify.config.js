"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("./types/types");
const FixtureController_1 = require("./controller/FixtureController");
const FixtureService_1 = require("./service/FixtureService");
const FixtureRepository_1 = require("./repository/FixtureRepository");
const ToJsonService_1 = require("./service/ToJsonService");
const container = new inversify_1.Container();
container.bind(inversify_express_utils_1.TYPE.Controller).to(FixtureController_1.FixtureController).whenTargetNamed('FixtureController');
container.bind(types_1.default.FixtureService).to(FixtureService_1.FixtureServiceImpl);
container.bind(types_1.default.FixtureNoSQLRepository).to(FixtureRepository_1.FixtureRepositoryMongo);
container.bind(types_1.default.ToJsonService).to(ToJsonService_1.ToJsonServiceImpl);
exports.default = container;
//# sourceMappingURL=inversify.config.js.map