import { IApplicationParams } from "../../interface/params/IApplicationParams";
import { BusinessException } from "../../lib/helper/BusinessException";
import { _utils } from "../../lib/utils/_utils";
import { HelperChild } from "./helper";

export class Validate extends HelperChild {

    validateParams = (applicationParams: IApplicationParams) => {

        if (!applicationParams) {
            throw new BusinessException("Empty Phone Number")

        }

        if (_utils.isEmpty(applicationParams.phone)) {
            throw new BusinessException("Empty Phone Number")
        }

        if (_utils.isEmpty(applicationParams.address)) {
            throw new BusinessException("Empty Address")

        }
    }
}