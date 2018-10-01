import * as DSNParser from "dsn-parser";


const config = {

    mongo () {
        if (process.env.MONGO_URL) {
            const dsn = new DSNParser.default(process.env.MONGO_URL);
            // let mongo_conf = dsn.getParts()
            console.log("Mongo connection ..", dsn.getParts());
            return {
                host: dsn.get("host"),
                port: dsn.get("port"),
                username: dsn.get("user"),
                password: dsn.get("password"),
                database: dsn.get("database"),
                useNewUrlParser: true

            };
        } else {
            return { database: "TeamonoEmpDB" };
        }
    }
};

export default config;