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
const Demo_1 = require("../model/Demo");
const types_1 = require("../types/types");
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
const fs = require("fs");
let DemoController = class DemoController extends BaseController_1.BaseController {
    constructor(demoService) {
        super();
        this.demoService = demoService;
    }
    createDemo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (JSON.stringify(req.files) != '{}') {
                return this.getJsondata(req.files.file[0])
                    .then((data) => {
                    console.log("data", data);
                    data.forEach(groupObj => {
                        let name = groupObj['group name'];
                        delete groupObj['group name'];
                        var op = [];
                        Object.keys(groupObj).forEach(function (key) {
                            var obj = {};
                            obj[key] = groupObj[key];
                            op.push(obj);
                        });
                        let demos = new Demo_1.Demo(name, op);
                        var createdDemo = this.demoService.createDemo(demos);
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
    getJsondata(file) {
        var exceltojson;
        return new Promise((resolve, reject) => {
            if (file.name.split('.')[file.name.split('.').length - 1] === 'xlsx') {
                exceltojson = xlsxtojson;
            }
            else {
                exceltojson = xlstojson;
            }
            var fileContent = file.data.toString('base64');
            var filepath = "tmp/uploads/" + file.name;
            var fileBuffer = new Buffer(fileContent, 'base64');
            fs.writeFile(filepath, fileBuffer, (err) => {
                try {
                    exceltojson({
                        input: filepath,
                        output: null,
                        lowerCaseHeaders: true
                    }, function (err, result) {
                        if (err) {
                            return reject(err);
                        }
                        else {
                            return resolve(result);
                        }
                    });
                }
                catch (e) {
                    return resolve({ msg: "Currupted File" });
                }
            });
        });
    }
    getGroup_Team(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const group_Team = yield this.demoService.getGroup_Team().catch(err => console.log(err));
            return this.renderJSON(req, res, { Group_Team: group_Team });
        });
    }
};
__decorate([
    inversify_express_utils_1.httpPost('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "createDemo", null);
__decorate([
    inversify_express_utils_1.httpGet('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], DemoController.prototype, "getGroup_Team", null);
DemoController = __decorate([
    inversify_express_utils_1.controller('/demo'),
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.default.DemoService)),
    __metadata("design:paramtypes", [Object])
], DemoController);
exports.DemoController = DemoController;
//# sourceMappingURL=DemoController.js.map