import 'reflect-metadata'
import { interfaces, TYPE, controller } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from './types/types';


import { GroupTeamController } from './controller/GroupTeamController';
import { GroupTeamService, GroupTeamServiceImpl } from './service/GroupTeamService'
import { GroupTeamRepository, GroupTeamRepositoryMongo } from './repository/GroupTeamRepository'


import { ToJsonService, ToJsonServiceImpl } from './service/ToJsonService'



const container = new Container();

container.bind<interfaces.Controller>(TYPE.Controller).to(GroupTeamController).whenTargetNamed('GroupTeamController');
container.bind<GroupTeamService>(TYPES.GroupTeamService).to(GroupTeamServiceImpl)
container.bind<GroupTeamRepository>(TYPES.GroupTeamNoSQLRepository).to(GroupTeamRepositoryMongo)

container.bind<ToJsonService>(TYPES.ToJsonService).to(ToJsonServiceImpl)



export default container;