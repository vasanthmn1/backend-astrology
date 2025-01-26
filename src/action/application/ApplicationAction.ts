import User from "../../db/entity/User";
import { IAuthUser } from "../../interface/auth/IAuthUser";
import { IApplicationParams } from "../../interface/params/IApplicationParams";
import { BusinessException } from "../../lib/helper/BusinessException";
import { ApplicationDao } from "../db/dao/ApplicationDao";
import { Persist } from "./Persist";
import { Validate } from "./validate";

export class ApplicationAction {


    persist = new Persist(this)
    validate = new Validate(this)
    applicationDao = new ApplicationDao()
    apply = async (authUser: IAuthUser, applicationParams: IApplicationParams): Promise<string> => {


        
        //validate params
        this.validate.validateParams(applicationParams)

        let user = await User.findOne({ email: authUser.user.email, is_delete: false, block: false })

        if (!user) {
            throw new BusinessException("Invalid User")
        }

        return await this.persist.save(authUser, applicationParams)

    }

}