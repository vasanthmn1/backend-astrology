import Zodiac from "../../db/entity/Zodiac";
import { IAuthUser } from "../../interface/auth/IAuthUser";
import { IZodiac } from "../../interface/db/entity/IZodiac";
import { IZodiacDeleteParams } from "../../interface/params/zodiac/IZodiacDeleteParams";
import { _static_const } from "../../lib/constants/_static";
import { BusinessException } from "../../lib/helper/BusinessException";
import { _dateUtils } from "../../lib/utils/_dateUtils";
import { _mongooseUtils } from "../../lib/utils/_mongoUtils";
import { _utils } from "../../lib/utils/_utils";
import { CloudinaryUtils } from "../../utils/cloudinary";
import { ZodiacDao } from "../db/dao/ZodiacDao";
import { List } from "./List";
import { Persist } from "./Persist";
import { QryList } from "./qry/QryList";
import { Validate } from "./validate";



export class ZodiacAction {


    list = new List(this)
    validate = new Validate(this)
    persist = new Persist(this)


    qryList = new QryList()
    zodiacDao = new ZodiacDao()

    cloudinaryUtils = new CloudinaryUtils()

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

    //## this edit and create new
    save = async (authUser: IAuthUser, zodiac: IZodiac): Promise<string> => {

        this.validate.zodiacValidateParams(zodiac)

        if (authUser.user.permission == _static_const.auth.user.access_permission.admin) {
            throw new BusinessException("Invalid Zodiac Access")
        }

        const image = await this.cloudinaryUtils.uploadImageToCloudinary(zodiac.photo.url);

        if (!image) {
            throw new BusinessException('Failed to upload image to Cloudinary.')
        }

        zodiac.photo = image
        zodiac.delete = false

        await this.zodiacDao.saveEntity(zodiac)

        return "Zodiac Create Success"

    }
    // private 

    delete = async (authUser: IAuthUser, zodiacDeleteParams: IZodiacDeleteParams): Promise<String> => {

        if (authUser.user.permission == _static_const.auth.user.access_permission.admin) {
            throw new BusinessException("Invalid Zodiac ID")
        }
        if (_mongooseUtils.isValidObjectId(zodiacDeleteParams.zodiac_id)) {
            throw new BusinessException("Invalid Zodiac ID")
        }

        let zodiac = {} as IZodiac

        zodiac._id = zodiacDeleteParams.zodiac_id
        zodiac.delete = zodiacDeleteParams.delete

        await this.persist.validateAndSaveDB(zodiac)

        return "Zodiac Delete Success"
    }



}