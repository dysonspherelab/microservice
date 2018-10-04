// import { Imodel } from "../interfaces";
import mongoose =  require("mongoose");
/**
 * Mongoose schema
 */

const modelSchema = new mongoose.Schema({
    entity: String,
});


export class modelDatabase {
    private _config: string;
    constructor(config: string) {
        this._config = config;
        mongoose.connect(this._config);
    }
    public model = mongoose.model("model", modelSchema);
}