import 'reflect-metadata'
import { interfaces, TYPE, controller } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from './types/types';


import { FixtureController } from './controller/FixtureController';
import { FixtureService, FixtureServiceImpl } from './service/FixtureService'
import { FixtureRepository, FixtureRepositoryMongo } from './repository/FixtureRepository'

import { ToJsonService, ToJsonServiceImpl } from './service/ToJsonService'



const container = new Container();


container.bind<interfaces.Controller>(TYPE.Controller).to(FixtureController).whenTargetNamed('FixtureController');
container.bind<FixtureService>(TYPES.FixtureService).to(FixtureServiceImpl)
container.bind<FixtureRepository>(TYPES.FixtureNoSQLRepository).to(FixtureRepositoryMongo)

container.bind<ToJsonService>(TYPES.ToJsonService).to(ToJsonServiceImpl)



export default container;