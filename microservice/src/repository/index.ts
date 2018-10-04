import "reflect-metadata";
import { injectable } from "inversify";
import { modelRepository, Imodel } from "../interfaces";
import { modelDatabase } from "../schema";
import CONFIG from "../config";

const modelsMongoDatabase = new modelDatabase(CONFIG.mongo());

/**
 * DB implementation on model API
 * @export
 * @class modelRepositoryMongo
 * @implements {modelRepository}
 */

@injectable()
export class modelRepositoryMongo implements modelRepository {


    public findAll(cond?: object) {
        return modelsMongoDatabase.model.find(cond);
    }

    public createmodel(modelData: Imodel) {
        return modelsMongoDatabase.model.create(modelData);
    }

    public deletemodel(id: string | number) {
        return modelsMongoDatabase.model.remove({ _id: id });
    }

}