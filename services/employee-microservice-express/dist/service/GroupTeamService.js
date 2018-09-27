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
const GroupTeam_1 = require("../model/GroupTeam");
const types_1 = require("../types/types");
let GroupTeamServiceImpl = class GroupTeamServiceImpl {
    createGroupTeam(groupTeamData) {
        return __awaiter(this, void 0, void 0, function* () {
            const groupTeamDTO = this.toGroupTeamDTO(groupTeamData);
            const createdDTO = yield this.GroupTeamRepositoryMongo.createGroupTeam(groupTeamDTO);
            return createdDTO;
        });
    }
    getGroup_Team() {
        return __awaiter(this, void 0, void 0, function* () {
            const groupTeamMongo = yield this.GroupTeamRepositoryMongo.findAll().then((a) => a.map((dto) => {
                return this.toGroupTeam(dto);
            }));
            return groupTeamMongo;
        });
    }
    toGroupTeam(groupTeamDTO) {
        return new GroupTeam_1.GroupTeam(groupTeamDTO.group_name, groupTeamDTO.teams, groupTeamDTO._id.toString());
    }
    toGroupTeamDTO(groupTeam) {
        return {
            group_name: groupTeam.getGroupName,
            teams: groupTeam.getTeams,
            _id: groupTeam.getId,
        };
    }
};
__decorate([
    inversify_1.inject(types_1.default.GroupTeamNoSQLRepository),
    __metadata("design:type", Object)
], GroupTeamServiceImpl.prototype, "GroupTeamRepositoryMongo", void 0);
GroupTeamServiceImpl = __decorate([
    inversify_1.injectable()
], GroupTeamServiceImpl);
exports.GroupTeamServiceImpl = GroupTeamServiceImpl;
//# sourceMappingURL=GroupTeamService.js.map