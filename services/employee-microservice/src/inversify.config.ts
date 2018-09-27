import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./types/types";
import { EmployeeRepositoryMongo, EmployeeServiceImpl } from "./classes";
const container = new Container();

container.bind<EmployeeRepositoryMongo>(TYPES.EmployeeRepository).to(EmployeeRepositoryMongo);
container.bind<EmployeeServiceImpl>(TYPES.EmployeeService).to(EmployeeServiceImpl);