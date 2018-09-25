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
const Demo_1 = require("../model/Demo");
const types_1 = require("../types/types");
let DemoServiceImpl = class DemoServiceImpl {
    createDemo(demoData) {
        return __awaiter(this, void 0, void 0, function* () {
            const demoDTO = this.toDemoDTO(demoData);
            const createdDTO = yield this.DemoRepositoryMongo.createDemo(demoDTO);
            return createdDTO;
        });
    }
    getGroup_Team() {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadsMongo = yield this.DemoRepositoryMongo.findAll().then((a) => a.map((dto) => {
                return this.toDemo(dto);
            }));
            return uploadsMongo;
        });
    }
    toDemo(demoDTO) {
        return new Demo_1.Demo(demoDTO.group_name, demoDTO.teams, demoDTO._id.toString());
    }
    toDemoDTO(demo) {
        return {
            group_name: demo.getGroupName,
            teams: demo.getTeams,
            _id: demo.getId,
        };
    }
};
__decorate([
    inversify_1.inject(types_1.default.DemoNoSQLRepository),
    __metadata("design:type", Object)
], DemoServiceImpl.prototype, "DemoRepositoryMongo", void 0);
DemoServiceImpl = __decorate([
    inversify_1.injectable()
], DemoServiceImpl);
exports.DemoServiceImpl = DemoServiceImpl;
//# sourceMappingURL=DemoService.js.map