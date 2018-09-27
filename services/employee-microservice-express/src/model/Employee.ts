
export interface IEmployee{
    getEntitity: string
    GetEmpId: string
    GetClient_id: string
    GetEmpName: string
    GetDept: string
    GetTeam: string
    GetManager: string
    GetCapital: string
    getId: string
}

export class Employee implements IEmployee {

    constructor(
        private entitity?: string,
        private empId?: string,
        private client_id?: string,
        private empName?: string,
        private dept?: string,
        private team?: string,
        private manager?: string,
        private capital?: string,
        private _id?: string,
    ) { }
    get getEntitity(): string {
        return this.entitity;
    }

    get GetEmpId(): string {
        return this.empId;
    }

    get GetClient_id(): string {
        return this.client_id;
    }

    get GetEmpName(): string {
        return this.empName;
    }

    get GetDept(): string {
        return this.dept;
    }

    get GetTeam(): string {
        return this.team;
    }

    get GetManager(): string {
        return this.manager;
    }

    get GetCapital(): string {
        return this.capital;
    }

    get getId(): string {
        return this._id;
    }
}