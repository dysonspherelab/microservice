import "reflect-metadata";
import { injectable, inject } from "inversify";
import * as Bluebird from "bluebird";
import { ImodelService, modelRepository, Imodel } from "../interfaces";
import TYPES from "../types/types";

/**
 * modelService interface implementation
 * @export
 * @class modelServiceImpl
 * @implements {modelService}
 */
@injectable()
export class modelService implements ImodelService {

    /**
     * Using inversify bindings sets the repository implementation
     * @private
     * @type {modelRepository}
     * @memberof modelServiceImpl
     */
    private _modelRepository: modelRepository;

    constructor(@inject(TYPES.modelRepository) modelRepository: modelRepository) {
        this._modelRepository = modelRepository;
    }

    /**
     * Creates a new model
     * @param {model} modelData
     * @returns {(Promise<model|Error>)}
     * @memberof modelServiceImpl
     */
    public async createmodel(modelData: Imodel): Promise<Imodel | Error> {
        const createdDTO: Imodel = await this._modelRepository.createmodel(modelData);
        return createdDTO;
    }

    public async getmodels(id?: string): Promise<Imodel[]> {
        const models = await this._modelRepository.findAll({ _id: id });
        return models;
    }

    public deletemodel(empId: number): Bluebird<number> {
        return this._modelRepository.deletemodel(empId);
    }
}
