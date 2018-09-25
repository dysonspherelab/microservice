export class Fixture {

    constructor(private week?: string,
        private team_1?: string,
        private team_2?: string,
        private _id?: string
    ) { }

    get GetWeek(): string {
        return this.week;
    }

    get GetTeam_1(): string {
        return this.team_1;
    }

    get GetTeam_2(): string {
        return this.team_2;
    }

    get getId(): string {
        return this._id;
    }
}