import { ICredentials } from "../../interface/params/Account/ICredentials"
import { BusinessException } from "../../lib/helper/BusinessException"
import { _utils } from "../../lib/utils/_utils"
import { HelperChild } from "./helper"

export class Validate extends HelperChild {
    validateCredentials = (credentials: ICredentials) => {

        if (!credentials.email || _utils.isEmpty(credentials.email)) {
            throw new BusinessException("Email is required")
        }

        if (!credentials.password || _utils.isEmpty(credentials.password)) {
            throw new BusinessException("Password is required")


        }
    }
}