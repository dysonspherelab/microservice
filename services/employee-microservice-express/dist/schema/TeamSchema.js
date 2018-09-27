"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const iridium_1 = require("iridium");
const typeorm_1 = require("typeorm");
const config_1 = require("../config");
let TeamMongoSchema = class TeamMongoSchema extends iridium_1.Instance {
};
TeamMongoSchema = __decorate([
    iridium_1.Collection('Teams')
], TeamMongoSchema);
exports.TeamMongoSchema = TeamMongoSchema;
class TeamDatabase extends iridium_1.Core {
    constructor() {
        super(...arguments);
        this.model = new iridium_1.Model(this, TeamMongoSchema);
    }
}
exports.TeamsMongoDatabase = new TeamDatabase(config_1.default.mongo());
let TeamDbSchema = class TeamDbSchema {
};
TeamDbSchema = __decorate([
    typeorm_1.Entity()
], TeamDbSchema);
exports.TeamDbSchema = TeamDbSchema;
//# sourceMappingURL=TeamSchema.js.map