import 'reflect-metadata'
import { interfaces, TYPE, controller } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from './types/types';


import { GroupTeamController } from './controller/GroupTeamController';
import { GroupTeamService, GroupTeamServiceImpl } from './service/GroupTeamService'
import { GroupTeamRepository, GroupTeamRepositoryMongo } from './repository/GroupTeamRepository'

import { EmployeeController } from './controller/EmployeeController';
import { EmployeeService, EmployeeServiceImpl } from './service/EmployeeService'
import { EmployeeRepository, EmployeeRepositoryMongo } from './repository/EmployeeRepository'

import { FixtureController } from './controller/FixtureController';
import { FixtureService, FixtureServiceImpl } from './service/FixtureService'
import { FixtureRepository, FixtureRepositoryMongo } from './repository/FixtureRepository'

import { ToJsonService, ToJsonServiceImpl } from './service/ToJsonService'



const container = new Container();

container.bind<interfaces.Controller>(TYPE.Controller).to(GroupTeamController).whenTargetNamed('GroupTeamController');
container.bind<GroupTeamService>(TYPES.GroupTeamService).to(GroupTeamServiceImpl)
container.bind<GroupTeamRepository>(TYPES.GroupTeamNoSQLRepository).to(GroupTeamRepositoryMongo)

container.bind<interfaces.Controller>(TYPE.Controller).to(EmployeeController).whenTargetNamed('EmployeeController');
container.bind<EmployeeService>(TYPES.EmployeeService).to(EmployeeServiceImpl)
container.bind<EmployeeRepository>(TYPES.EmployeeNoSQLRepository).to(EmployeeRepositoryMongo)

container.bind<interfaces.Controller>(TYPE.Controller).to(FixtureController).whenTargetNamed('FixtureController');
container.bind<FixtureService>(TYPES.FixtureService).to(FixtureServiceImpl)
container.bind<FixtureRepository>(TYPES.FixtureNoSQLRepository).to(FixtureRepositoryMongo)

container.bind<ToJsonService>(TYPES.ToJsonService).to(ToJsonServiceImpl)



export default container;