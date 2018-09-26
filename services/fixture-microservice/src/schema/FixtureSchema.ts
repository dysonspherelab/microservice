import { Core, Model, Instance, Collection, Index, Property, ObjectID } from 'iridium';
import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

import CONFIG from '../config'


export interface FixtureDTO {
    _id?: string;
    week?: string;
    team_1?: string;
    team_2?:string;
    
}

/**
* Iridium config
*/

@Collection('Fixture')
export class FixtureMongoSchema extends Instance<FixtureDTO, FixtureMongoSchema> implements FixtureDTO {
    @ObjectID
    public _id: string;

    @Property(String, false)
    public week: string;

    @Property(String, false)
    public team_1: string;

    @Property(String, false)
    public team_2: string;


}

class FixtureDatabase extends Core {
    public model = new Model<FixtureDTO, FixtureMongoSchema>(this, FixtureMongoSchema);

}

export const FixturesMongoDatabase = new FixtureDatabase(CONFIG.mongo());



