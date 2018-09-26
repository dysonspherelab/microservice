import { injectable, inject } from 'inversify'

import { Fixture } from '../model/Fixture';


import { FixtureRepository } from "../repository/FixtureRepository"

import TYPES from '../types/types'

import { FixtureDTO } from '../schema/FixtureSchema'


/**
 * Interface for services on Fixture API
 * 
 * @export
 * @interface FixtureService
 */
export interface FixtureService {
    getFixtures(): Promise<object>
    createFixture(fixtureData: Fixture): Promise<FixtureDTO | Error>
}

/**
 * FixtureService interface implementation
 * 
 * @export
 * @class FixtureServiceImpl
 * @implements {FixtureService}
 */
@injectable()
export class FixtureServiceImpl implements FixtureService {

    /**
     * Using inversify bindings sets the mongo repository implementation
     * 
     * @private
     * @type {FixtureRepository}
     * @memberof FixtureServiceImpl
     */
    @inject(TYPES.FixtureNoSQLRepository)
    private FixtureRepositoryMongo: FixtureRepository

    /**
     * Creates a new Fixture 
     * 
     * @param {Fixture} fixtureData 
     * @returns {(Promise<Fixture|Error>)} 
     * @memberof FixtureServiceImpl
     */
    public async  createFixture(fixtureData: Fixture): Promise<FixtureDTO | Error> {
        const fixtureDTO: FixtureDTO = this.toFixtureDTO(fixtureData);

        const createdDTO: FixtureDTO = await this.FixtureRepositoryMongo.createFixture(fixtureDTO);


        return createdDTO
    }

    public async getFixtures():  Promise<Array<Fixture>> {
        const fixtureMongo: Array<Fixture> = await this.FixtureRepositoryMongo.findAll().then((a) => a.map((dto: FixtureDTO) => {
            return this.toFixture(dto);
        }));

        return fixtureMongo
    }



    /**
     * Converts fixture DTO to model
     * 
     * @private
     * @param {FixtureDTO} fixtureDTO 
     * @returns {Fixture} 
     * @memberof FixtureServiceImpl
     */
    private toFixture(fixtureDTO: FixtureDTO): Fixture {
        return new Fixture(
            fixtureDTO.week,
            fixtureDTO.team_1,
            fixtureDTO.team_2,
            fixtureDTO._id.toString()
        )
    }


    /**
     * Converts fixture model to DTO
     * 
     * @private
     * @param {Fixture} fixture 
     * @returns {FixtureDTO} 
     * @memberof FixtureServiceImpl
     */
    private toFixtureDTO(fixture: Fixture): FixtureDTO {
        return {

            week: fixture.GetWeek,
            team_1: fixture.GetTeam_1,
            team_2: fixture.GetTeam_2,
            _id: fixture.getId,

        }
    }
}