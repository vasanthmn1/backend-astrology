import Zodiac from "../../db/entity/Zodiac";
import { IAuthUser } from "../../interface/auth/IAuthUser";
import { IZodiac } from "../../interface/db/entity/IZodiac";
import { BusinessException } from "../../lib/helper/BusinessException";
import { _utils } from "../../lib/utils/_utils";
import { ZodiacDao } from "../db/dao/ZodiacDao";
import { List } from "./List";
import { QryList } from "./qry/QryList";
import { Validate } from "./validate";



export class ZodiacAction {


    list = new List(this)
    validate = new Validate(this)

    qryList = new QryList()

    zodiacDao = new ZodiacDao()



    getZodiac = async (authUser: IAuthUser, zodiac_id: string): Promise<IZodiac> => {

        if (_utils.isEmpty(zodiac_id)) {
            throw new BusinessException("Invalid Zodiac ID")
        }

        let zodiac = await Zodiac.findOne({ id: zodiac_id, delete: false })

        if (!zodiac) {
            throw new BusinessException("Invalid Zodiac ")
        }
        return zodiac
    }

}