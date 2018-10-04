
const config = {

    mongo (): string {
        if (process.env.MONGO_URL) {
            return process.env.MONGO_URL;
        } else {
            return "mongodb://localhost:27017/model";
        }
    }
};

export default config;