"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Demo {
    constructor(group_name, teams, _id) {
        this.group_name = group_name;
        this.teams = teams;
        this._id = _id;
    }
    get getGroupName() {
        return this.group_name;
    }
    get getTeams() {
        return this.teams;
    }
    get getId() {
        return this._id;
    }
}
exports.Demo = Demo;
//# sourceMappingURL=Demo.js.map