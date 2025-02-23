import User from "../../db/entity/User";
import { ICredentials } from "../../interface/params/Account/ICredentials";
import { _static_const } from "../../lib/constants/_static";
import { BusinessException } from "../../lib/helper/BusinessException";
import { HelperChild } from "./helper";

import bcrypt from "bcrypt";
export class Register extends HelperChild {


    createUser = async (credentials: ICredentials) => {

        this.p.validate.validateCredentials(credentials)

        await this.checkAlreadyExist(credentials.email)

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(credentials.password, salt);

        await this.saveUser(credentials, hashPassword)

        return credentials
    }

    private checkAlreadyExist = async (email: string) => {

        const user = await User.findOne({ email })

        if (user) {
            throw new BusinessException("User already exist")
        }
    }

    private saveUser = async (credentials: ICredentials, hashPassword: string) => {
        const user = new User()
        user.email = credentials.email
        user.password = hashPassword
        user.access_permission = _static_const.auth.user.access_permission.user
        user.is_delete = false
        await user.save()

        if (!user) {
            throw new BusinessException("User not saved")
        }
    }
}