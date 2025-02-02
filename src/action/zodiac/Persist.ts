import { IZodiac } from "../../interface/db/entity/IZodiac";
import { IZodiacDeleteParams } from "../../interface/params/zodiac/IZodiacDeleteParams";
import { BusinessException } from "../../lib/helper/BusinessException";
import { HelperChild } from "./helper";

export class Persist extends HelperChild {

    validateAndSaveDB = async (zodiac: IZodiac) => {
        await this.p.validate.checkDB(zodiac._id, zodiac.delete)

        let saveZodiac = await this.p.zodiacDao.updateEntity(zodiac)

        if (!saveZodiac) {
            throw new BusinessException("Invalid Zodiac ")
        }

    }
}