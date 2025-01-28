import User from "../../db/entity/User";
import { IUser } from "../../interface/db/entity/IUser";
import { ICredentials } from "../../interface/params/Account/ICredentials";
import { ILoginResponse } from "../../interface/response/account/ILoginResponce";
import { BusinessException } from "../../lib/helper/BusinessException";
import { HelperChild } from "./helper";
import bcrypt from 'bcrypt'
export class Login extends HelperChild {

    login = async (credential: ICredentials): Promise<ILoginResponse> => {

        this.p.validate.validateCredentials(credential)

        let user = await User.findOne({ email: credential.email })

        if (!user) {
            throw new BusinessException("User not found")
        }

        this.checkVerifyUser(user)

        let isMatch = await bcrypt.compare(credential.password, user.password)

        if (!isMatch) {
            throw new BusinessException("Invalid email or password")
        }

        const token = this.p.jwtTokenAction.generateToken(user)

        return {
            token: token,
            user: {
                access_permission: user.access_permission,
                email: user.email,
                id: user.id

            }
        }
    }


    private checkVerifyUser = (user: IUser) => {
        // check if user is verified or not
        // if (!user.is_verify) {
        //     throw new BusinessException("User not verified")
        // }

        if (user.is_delete) {
            throw new BusinessException("User is Deleted")
        }

        if (user.block) {
            throw new BusinessException("User is blocked")

        }
    }

}