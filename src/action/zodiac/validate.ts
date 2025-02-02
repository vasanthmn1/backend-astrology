import Zodiac from "../../db/entity/Zodiac";
import { IZodiac } from "../../interface/db/entity/IZodiac";
import { ZodiacListParams } from "../../interface/params/zodiac/IZodiacListParams";
import { BusinessException } from "../../lib/helper/BusinessException";
import { _utils } from "../../lib/utils/_utils";
import { HelperChild } from "./helper";

export class Validate extends HelperChild {


    zodiacValidateParams = (params: IZodiac) => {
        // validateParams = (applicationParams: IApplicationParams) => {

        if (!params) {
            throw new BusinessException("Invalid Params")
        }

        if (_utils.isEmpty(params.title)) {
            throw new BusinessException("Empty Phone Number")
        }
        if (_utils.isEmpty(params.description)) {
            throw new BusinessException("Empty Address")
        }
    }



    checkDB = async (id: string, is_delete: boolean) => {

        if (!is_delete) {
            throw new BusinessException('Not Allow Delete Retrieve')
        }

        let zodiac = await Zodiac.findOne({ id: id, delete: is_delete })

        if (zodiac) {
            throw new BusinessException('Invalid  Zodiac')

        }

    }
}