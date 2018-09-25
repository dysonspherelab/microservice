import 'reflect-metadata'
import { interfaces, TYPE, controller } from 'inversify-express-utils';
import { Container } from 'inversify';
import TYPES from './types/types';


import { EmployeeController } from './controller/EmployeeController';
import { EmployeeService, EmployeeServiceImpl } from './service/EmployeeService'
import { EmployeeRepository, EmployeeRepositoryMongo } from './repository/EmployeeRepository'

import { ToJsonService, ToJsonServiceImpl } from './service/ToJsonService'



const container = new Container();


container.bind<interfaces.Controller>(TYPE.Controller).to(EmployeeController).whenTargetNamed('EmployeeController');
container.bind<EmployeeService>(TYPES.EmployeeService).to(EmployeeServiceImpl)
container.bind<EmployeeRepository>(TYPES.EmployeeNoSQLRepository).to(EmployeeRepositoryMongo)

container.bind<ToJsonService>(TYPES.ToJsonService).to(ToJsonServiceImpl)


export default container;