import _config from "../../config/config";
import mongoose from "mongoose"
import _logUtils from "../../lib/utils/_logUtils";
export let connectMongoDB = {

    connect: async () => {
        try {
            const connection = await mongoose.connect(_config.db.mongo_url);
            _logUtils.log(`mongoDB connection ${connection.connection.host}`);
        } catch (error: any) {
            _logUtils.logJsonStringify(error.message);
            process.exit(1);
        }
    }
}