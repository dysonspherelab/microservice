import { Container } from "inversify";
import TYPES from "./types/types";
import { EmployeeRepositoryMongo, EmployeeService, Employee } from "./classes";
import { EmployeeRepository, IEmployeeService, EmployeeDO } from "./interfaces";

const container = new Container();

container.bind<EmployeeRepository>(TYPES.EmployeeRepository).to(EmployeeRepositoryMongo);
container.bind<IEmployeeService>(TYPES.IEmployeeService).to(EmployeeService);
container.bind<EmployeeDO>(TYPES.EmployeeDO).to(Employee);

export default container;