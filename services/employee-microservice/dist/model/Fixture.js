"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Fixture {
    constructor(week, team_1, team_2, _id) {
        this.week = week;
        this.team_1 = team_1;
        this.team_2 = team_2;
        this._id = _id;
    }
    get GetWeek() {
        return this.week;
    }
    get GetTeam_1() {
        return this.team_1;
    }
    get GetTeam_2() {
        return this.team_2;
    }
    get getId() {
        return this._id;
    }
}
exports.Fixture = Fixture;
//# sourceMappingURL=Fixture.js.map