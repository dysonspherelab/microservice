import { Core, Model, Instance, Collection, Index, Property, ObjectID } from 'iridium';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

import CONFIG from '../config'


export interface GroupTeamDTO {
    _id?: string;
    group_name?: string;
    teams?: object[];
}

/**
* Iridium config
*/

@Collection('GroupTeam')
export class GroupTeamMongoSchema extends Instance<GroupTeamDTO, GroupTeamMongoSchema> implements GroupTeamDTO {
    @ObjectID
    public _id: string;

    @Property(String, true)
    public group_name: string;

    @Property([Object], false)
    public teams?: object[];


}

class GroupTeamDatabase extends Core {
    public model = new Model<GroupTeamDTO, GroupTeamMongoSchema>(this, GroupTeamMongoSchema);

}

export const GroupTeamsMongoDatabase = new GroupTeamDatabase(CONFIG.mongo());



