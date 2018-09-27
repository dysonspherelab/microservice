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
const Fixture_1 = require("../model/Fixture");
const types_1 = require("../types/types");
let FixtureController = class FixtureController extends BaseController_1.BaseController {
    constructor(fixtureService, toJsonService) {
        super();
        this.fixtureService = fixtureService;
        this.toJsonService = toJsonService;
    }
    createFixture(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (JSON.stringify(req.files) != '{}') {
                return this.toJsonService.getJsondata(req.files.file[0])
                    .then((data) => {
                    data.forEach(fixtureObj => {
                        console.log("fixtureObj", fixtureObj);
                        let fixture = new Fixture_1.Fixture(fixtureObj.week, fixtureObj.team1_id, fixtureObj.team2_id);
                        var createdFixture = this.fixtureService.createFixture(fixture);
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
    getFixtures(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const fixtures = yield this.fixtureService.getFixtures().catch(err => console.log(err));
            return this.renderJSON(req, res, { Fixtures: fixtures });
        });
    }
};
__decorate([
    inversify_express_utils_1.httpPost('/fixture'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], FixtureController.prototype, "createFixture", null);
__decorate([
    inversify_express_utils_1.httpGet('/fixture'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], FixtureController.prototype, "getFixtures", null);
FixtureController = __decorate([
    inversify_express_utils_1.controller('/admin'),
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.FixtureService)),
    __param(1, inversify_1.inject(types_1.default.ToJsonService)),
    __metadata("design:paramtypes", [Object, Object])
], FixtureController);
exports.FixtureController = FixtureController;
//# sourceMappingURL=FixtureController.js.map