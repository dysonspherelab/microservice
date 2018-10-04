import { Container } from "inversify";
import TYPES from "./types/types";
import { model } from "./domain-model";
import { modelRepositoryMongo } from "./repository";
import { modelService } from "./class"
import { modelRepository, ImodelService, modelDO } from "./interfaces";

const container = new Container();

container.bind<modelRepository>(TYPES.modelRepository).to(modelRepositoryMongo);
container.bind<ImodelService>(TYPES.ImodelService).to(modelService);
container.bind<modelDO>(TYPES.modelDO).to(model);

export default container;