import { injectable } from 'inversify'
import { FixtureDTO, FixturesMongoDatabase, FixtureMongoSchema } from '../schema/FixtureSchema';


export interface FixtureRepository {
    findAll(): Promise<Array<FixtureDTO>>
    createFixture(fixtureData: FixtureDTO): Promise<FixtureDTO>
}


/**
* Iridium implementation on Fixture API
* 
* @export
* @class FixtureRepositoryMongo
* @implements {FixtureRepository}
*/

@injectable()
export class FixtureRepositoryMongo implements FixtureRepository {



    public async findAll(): Promise<Array<FixtureDTO>> {
        const FixtureDTOs = await FixturesMongoDatabase.connect().then(() => FixturesMongoDatabase.model.find())
        return FixtureDTOs.toArray()
    }

    /**
    * Create new mongo document for Fixture
    * 
    * @param {FixtureDTO} fixtureData 
    * @returns {Promise<FixtureDTO>} 
    * @memberof FixtureRepositoryMongo
    */
    public async createFixture(fixtureData: FixtureDTO): Promise<FixtureDTO> {
        return await FixturesMongoDatabase.connect().then(() => {

            return FixturesMongoDatabase.model.insert(fixtureData)
        })

    }


}