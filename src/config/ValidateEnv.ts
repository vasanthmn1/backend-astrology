import { IConfig } from "../interface/config/IConfig";
import { BusinessException } from "../lib/helper/BusinessException";
import { _utils } from "../lib/utils/_utils";


interface CItem {
    value: any
    type: "string" | "number" | "bool"
    ref: string
    emptyCheck: boolean
}


class ValidateEnv {
    validate = (config: IConfig): IConfig => {

        let items: CItem[] = [
            this.addCItem(config.port, "number", 'port'),
            this.addCItem(config.flag.live, "bool", 'live'),

            this.addCItem(config.db.mongo_url, "string", 'mongo_url'),
            this.addCItem(config.secret_key.jwt_web, "string", 'jwt_web'),

            this.addCItem(config.cloudinary.name, "string", 'cloudinary name'),
            this.addCItem(config.cloudinary.api_key, "string", 'cloudinary api key'),
            this.addCItem(config.cloudinary.api_secret, "string", 'api_secret')


        ]

        items.some((item) => {
            if (!this.validateConfigItem(item)) {
                throw new BusinessException(`Env  Error @ ${item.ref}`)
            }
        })

        return config

    }
    private validateConfigItem = (item: CItem): boolean => {
        if (item.type == "number" && (isNaN(item.value) || typeof item.value !== "number")) {
            console.log('=====', item.value);

            return false
        }

        if ((item.type == "string")) {
            if (typeof item.value !== "string" || (item.emptyCheck && _utils.isEmptyStrict(item.value))) {
                return false
            }
        }

        if (item.type == "bool" && typeof item.value !== "boolean") {
            return false
        }

        return true
    }


    private addCItem = (value: any, type: "string" | "number" | "bool", ref: string, emptyCheck: boolean = true): CItem => {
        return {
            value,
            type,
            ref,
            emptyCheck
        }
    }
}
export default ValidateEnv