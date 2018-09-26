"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DSNParser = require("dsn-parser");
const Config = {
    mongo: function () {
        if (process.env.MONGO_URL) {
            let dsn = new DSNParser(process.env.MONGO_URL);
            console.log('Mongo connection ..', dsn.getParts());
            return {
                host: dsn.get('host'),
                port: dsn.get('port'),
                username: dsn.get('user'),
                password: dsn.get('password'),
                database: dsn.get('database'),
                useNewUrlParser: true
            };
        }
        else {
            return { database: 'TeamonoGroupDB' };
        }
    }
};
exports.default = Config;
//# sourceMappingURL=config.js.map