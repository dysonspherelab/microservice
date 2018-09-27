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
const GroupTeam_1 = require("../model/GroupTeam");
const types_1 = require("../types/types");
let GroupTeamController = class GroupTeamController extends BaseController_1.BaseController {
    constructor(groupTeamService, toJsonService) {
        super();
        this.groupTeamService = groupTeamService;
        this.toJsonService = toJsonService;
    }
    createGroupTeam(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (JSON.stringify(req.files) != '{}') {
                return this.toJsonService.getJsondata(req.files.file[0])
                    .then((data) => {
                    data.forEach(groupObj => {
                        let name = groupObj['group name'];
                        delete groupObj['group name'];
                        var op = [];
                        Object.keys(groupObj).forEach(function (key) {
                            var obj = {};
                            obj[key] = groupObj[key];
                            op.push(obj);
                        });
                        let groupTeams = new GroupTeam_1.GroupTeam(name, op);
                        var createdGroupTeam = this.groupTeamService.createGroupTeam(groupTeams);
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
    getGroup_Team(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const group_Team = yield this.groupTeamService.getGroup_Team().catch(err => console.log(err));
            return this.renderJSON(req, res, { Group_Team: group_Team });
        });
    }
};
__decorate([
    inversify_express_utils_1.httpPost('/groupteam'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], GroupTeamController.prototype, "createGroupTeam", null);
__decorate([
    inversify_express_utils_1.httpGet('/groupteam'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], GroupTeamController.prototype, "getGroup_Team", null);
GroupTeamController = __decorate([
    inversify_express_utils_1.controller('/admin'),
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.GroupTeamService)),
    __param(1, inversify_1.inject(types_1.default.ToJsonService)),
    __metadata("design:paramtypes", [Object, Object])
], GroupTeamController);
exports.GroupTeamController = GroupTeamController;
//# sourceMappingURL=GroupTeamController.js.map