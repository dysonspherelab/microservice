/**
 * GroupTeam model
 * 
 * @export
 * @class GroupTeam
 */
export class GroupTeam {
    
        /**
         * Creates an instance of GroupTeam.
        
         * @param {string} [_id] 
         * @param {string} groupTeam
         * @param {string} mongoId
         * @memberof GroupTeam
         */
        constructor(
            private group_name?: string,
            public teams?: object[],
            private _id?: string,
           
        ) {
        }
    
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberof GroupTeam
         */
        get getGroupName(): string {
            return this.group_name;
        }

        get getTeams(): Array<Object> {
            return this.teams;
        }
    
        /**
         * 
         * 
         * @readonly
         * @type {string}
         * @memberof GroupTeam
         */
        get getId(): string {
            return this._id;
        }
    
    
    }