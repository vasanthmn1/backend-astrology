import { config } from "dotenv"
import path, { resolve } from "path";
import { ProcessEnv } from "../interface/config/ProcessEnv";
import { IConfig } from "../interface/config/IConfig";
import ValidateEnv from "./ValidateEnv";
import { _utils } from "../lib/utils/_utils";


let envPath = path.resolve(".env.dev")


config({ path: resolve(__dirname, envPath) })


let env = process.env as unknown as ProcessEnv

let configs: IConfig = {

    port: _utils.isParseInt(env.PORT),
    db: {
        mongo_url: env.MONGO_URL
    },
    flag: {
        live: _utils.parseBooleam(env.LIVE)
    },

    secret_key: {
        jwt_web: env.JWT_SECRET_WEB,
        private: env.PRIVATE_SECRET_WEB
    },
    static_key: {
        public: _utils.trim(env.PUBLIC_STATIC)
    },

    cloudinary: {
        api_key: _utils.trim(env.CLOUDINARY_API_KEY),
        api_secret: _utils.trim(env.CLOUDINARY_API_KEY),
        name: _utils.trim(env.CLOUDINARY_NAME),
    }


}
let _config = new ValidateEnv().validate(configs)

export default _config