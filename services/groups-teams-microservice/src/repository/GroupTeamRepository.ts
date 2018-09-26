import { injectable } from 'inversify'
import { GroupTeamDTO, GroupTeamsMongoDatabase, GroupTeamMongoSchema } from '../schema/GroupTeamSchema';

/**
 * Interface for iridium and typeorm database operations on GroupTeam API
 * 
 * @export
 * @interface GroupTeamRepository
 */

export interface GroupTeamRepository {
    findAll(): Promise<Array<GroupTeamDTO>>
    createGroupTeam(groupTeamData: GroupTeamDTO): Promise<GroupTeamDTO>
}


/**
* Iridium implementation on GroupTeam API
* 
* @export
* @class GroupTeamRepositoryMongo
* @implements {GroupTeamRepository}
*/

@injectable()
export class GroupTeamRepositoryMongo implements GroupTeamRepository {


    public async findAll(): Promise<Array<GroupTeamDTO>> {
        const GroupTeamDTOs = await GroupTeamsMongoDatabase.connect().then(() => GroupTeamsMongoDatabase.model.find())
        return GroupTeamDTOs.toArray()
    }

    /**
    * Create new mongo document for GroupTeam
    * 
    * @param {GroupTeamDTO} groupTeamData 
    * @returns {Promise<GroupTeamDTO>} 
    * @memberof GroupTeamRepositoryMongo
    */
    public async createGroupTeam(groupTeamData: GroupTeamDTO): Promise<GroupTeamDTO> {
        return await GroupTeamsMongoDatabase.connect().then(() => {

            return GroupTeamsMongoDatabase.model.insert(groupTeamData)
        })

    }

}