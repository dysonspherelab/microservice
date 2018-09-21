import { Core, Model, Instance, Collection, Index, Property, ObjectID } from 'iridium';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

import CONFIG from '../config'


export interface TeamDTO {
   


}

/**
* Iridium config
*/

@Collection('Teams')
export class TeamMongoSchema extends Instance<TeamDTO, TeamMongoSchema> implements TeamDTO {
   
}

class TeamDatabase extends Core {
    public model = new Model<TeamDTO, TeamMongoSchema>(this, TeamMongoSchema);

}

export const TeamsMongoDatabase = new TeamDatabase(CONFIG.mongo());



/**
 * TypeORM Schema Config
 */
@Entity()
export class TeamDbSchema implements TeamDTO {
   
}

