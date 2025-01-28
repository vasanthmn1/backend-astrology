import { ICredentials } from "../../interface/params/Account/ICredentials"
import { _utils } from "../../lib/utils/_utils"
import { HelperChild } from "./helper"

export class Validate extends HelperChild {
    validateCredentials = async (credentials: ICredentials) => {

        if (!credentials.email || _utils.isEmpty(credentials.email)) {
            throw new Error("Email is required")
        }

        if (!credentials.password || _utils.isEmpty(credentials.password)) {
            throw new Error("Password is required")


        }
    }
}