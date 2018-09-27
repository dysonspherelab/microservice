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
const Fixture_1 = require("../model/Fixture");
const types_1 = require("../types/types");
let FixtureServiceImpl = class FixtureServiceImpl {
    createFixture(fixtureData) {
        return __awaiter(this, void 0, void 0, function* () {
            const fixtureDTO = this.toFixtureDTO(fixtureData);
            const createdDTO = yield this.FixtureRepositoryMongo.createFixture(fixtureDTO);
            return createdDTO;
        });
    }
    getFixtures() {
        return __awaiter(this, void 0, void 0, function* () {
            const fixtureMongo = yield this.FixtureRepositoryMongo.findAll().then((a) => a.map((dto) => {
                return this.toFixture(dto);
            }));
            return fixtureMongo;
        });
    }
    toFixture(fixtureDTO) {
        return new Fixture_1.Fixture(fixtureDTO.week, fixtureDTO.team_1, fixtureDTO.team_2, fixtureDTO._id.toString());
    }
    toFixtureDTO(fixture) {
        return {
            week: fixture.GetWeek,
            team_1: fixture.GetTeam_1,
            team_2: fixture.GetTeam_2,
            _id: fixture.getId,
        };
    }
};
__decorate([
    inversify_1.inject(types_1.default.FixtureNoSQLRepository),
    __metadata("design:type", Object)
], FixtureServiceImpl.prototype, "FixtureRepositoryMongo", void 0);
FixtureServiceImpl = __decorate([
    inversify_1.injectable()
], FixtureServiceImpl);
exports.FixtureServiceImpl = FixtureServiceImpl;
//# sourceMappingURL=FixtureService.js.map