import "reflect-metadata";
import { interfaces, TYPE } from "inversify-express-utils";
import { Container } from "inversify";

import { Controller } from "./controller/Controller";

const container = new Container();
container.bind<interfaces.Controller>(TYPE.Controller).to(Controller).whenTargetNamed("Controller");


export default container;