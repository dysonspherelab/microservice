import "reflect-metadata";
import { injectable, inject } from "inversify";
import { ImodelService, Imodel, modelDO } from "../interfaces";
import TYPES from "../types/types";

/**
 * model implementation
 * @export
 * @class model
 * @implements {modelDO}
 */
@injectable()
export class model implements modelDO {
    private _entity!: string;
    private _model: Imodel;
    @inject(TYPES.ImodelService) private _modelService!: ImodelService;
    constructor() {
        this._model = this._setmodel({});
    }

    private _getEntitity(object: Imodel): string {
        this._entity = object.entity || "";
        return this._entity;
    }

    private _setmodel(object: Imodel) {
        return {
            entity: this._getEntitity(object),
        };
    }

    public getmodel(id: string) {
        return this._modelService.getmodels(id)
        .then(arr => arr[0]);
    }

    public addmodel(modelData: Imodel) {
        this._model = this._setmodel(modelData);
        return this._modelService.createmodel(this._model);
    }

    public listmodels() {
        return this._modelService.getmodels();
    }

    public removemodel(id: number) {
        return this._modelService.deletemodel(id);
    }
}