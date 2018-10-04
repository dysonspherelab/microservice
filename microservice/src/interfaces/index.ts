import * as Bluebird from "bluebird";

/**
 * Interface for model Data Transfer Object
 * @export
 * @interface modelDTO
 */
export interface Imodel {
    entity?: string;
}

export interface modelDO {
    getmodel(id: string): Promise<Imodel>;
    addmodel(modelData: Imodel): Promise<Imodel | Error>;
    listmodels(): Promise<Imodel[]>;
    removemodel(id: string | number): Bluebird<number>;
}

/**
 * Interface for services on model API
 * @export
 * @interface modelService
 */
export interface ImodelService {
    getmodels(id?: string): Promise<Imodel[]>;
    createmodel(modelData: Imodel): Promise<Imodel | Error>;
    deletemodel(id: string | number): Bluebird<number>;
}



/**
 * Interface for iridium and typeorm database operations on model API
 * @export
 * @interface modelRepository
 */

export interface modelRepository {
    findAll(cond?: object): any;
    createmodel(modelData: Imodel): any;
    deletemodel(id: string | number): any;
}