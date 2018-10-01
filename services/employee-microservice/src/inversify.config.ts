import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./types/types";
import { EmployeeRepositoryMongo, EmployeeService, Employee } from "./classes";
const container = new Container();

container.bind<any>(TYPES.EmployeeRepository).to(EmployeeRepositoryMongo);
container.bind<any>(TYPES.IEmployeeService).to(EmployeeService);
container.bind<any>(TYPES.EmployeeDO).to(Employee);