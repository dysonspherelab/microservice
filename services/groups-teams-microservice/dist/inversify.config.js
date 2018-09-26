"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = require("./types/types");
const GroupTeamController_1 = require("./controller/GroupTeamController");
const GroupTeamService_1 = require("./service/GroupTeamService");
const GroupTeamRepository_1 = require("./repository/GroupTeamRepository");
const ToJsonService_1 = require("./service/ToJsonService");
const container = new inversify_1.Container();
container.bind(inversify_express_utils_1.TYPE.Controller).to(GroupTeamController_1.GroupTeamController).whenTargetNamed('GroupTeamController');
container.bind(types_1.default.GroupTeamService).to(GroupTeamService_1.GroupTeamServiceImpl);
container.bind(types_1.default.GroupTeamNoSQLRepository).to(GroupTeamRepository_1.GroupTeamRepositoryMongo);
container.bind(types_1.default.ToJsonService).to(ToJsonService_1.ToJsonServiceImpl);
exports.default = container;
//# sourceMappingURL=inversify.config.js.map