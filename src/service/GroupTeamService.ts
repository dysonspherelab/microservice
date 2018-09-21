import { injectable, inject } from 'inversify'

import { GroupTeam } from '../model/GroupTeam';


import { GroupTeamRepository } from "../repository/GroupTeamRepository"

import TYPES from '../types/types'

import { GroupTeamDTO } from '../schema/GroupTeamSchema'



/**
 * Interface for services on GroupTeam API
 * 
 * @export
 * @interface GroupTeamService
 */
export interface GroupTeamService {
    getGroup_Team():  Promise<Array<GroupTeam>>
    createGroupTeam(groupTeamData: GroupTeam): Promise<GroupTeamDTO | Error>
}

/**
 * GroupTeamService interface implementation
 * 
 * @export
 * @class GroupTeamServiceImpl
 * @implements {GroupTeamService}
 */
@injectable()
export class GroupTeamServiceImpl implements GroupTeamService {

    /**
     * Using inversify bindings sets the mongo repository implementation
     * 
     * @private
     * @type {GroupTeamRepository}
     * @memberof GroupTeamServiceImpl
     */
    @inject(TYPES.GroupTeamNoSQLRepository)
    private GroupTeamRepositoryMongo: GroupTeamRepository


    /**
     * Creates a new GroupTeam 
     * 
     * @param {GroupTeam} groupTeamData 
     * @returns {(Promise<GroupTeam|Error>)} 
     * @memberof GroupTeamServiceImpl
     */
    public async  createGroupTeam(groupTeamData: GroupTeam): Promise<GroupTeamDTO | Error> {
        const groupTeamDTO: GroupTeamDTO = this.toGroupTeamDTO(groupTeamData);

        const createdDTO: GroupTeamDTO = await this.GroupTeamRepositoryMongo.createGroupTeam(groupTeamDTO);


        return createdDTO
    }

    public async getGroup_Team():  Promise<Array<GroupTeam>> {
        const groupTeamMongo: Array<GroupTeam> = await this.GroupTeamRepositoryMongo.findAll().then((a) => a.map((dto: GroupTeamDTO) => {
            return this.toGroupTeam(dto);
        }));

        return groupTeamMongo
    }


    /**
     * Converts groupTeam DTO to model
     * 
     * @private
     * @param {GroupTeamDTO} groupTeamDTO 
     * @returns {GroupTeam} 
     * @memberof GroupTeamServiceImpl
     */
    private toGroupTeam(groupTeamDTO: GroupTeamDTO): GroupTeam {
        return new GroupTeam(
            groupTeamDTO.group_name,
            groupTeamDTO.teams,
            groupTeamDTO._id.toString()
        )
    }


    /**
     * Converts groupTeam model to DTO
     * 
     * @private
     * @param {GroupTeam} groupTeam 
     * @returns {GroupTeamDTO} 
     * @memberof GroupTeamServiceImpl
     */
    private toGroupTeamDTO(groupTeam: GroupTeam): GroupTeamDTO {
        return {

            group_name: groupTeam.getGroupName,
            teams:groupTeam.getTeams,
            _id: groupTeam.getId,

        }
    }
}