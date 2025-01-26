import { NextFunction, Request, Response } from "express";
import _config from "../../config/config";
import { BusinessException } from "../../lib/helper/BusinessException";
import { AccessPointEnum } from "../../enum/AccessPointEnum";
import { JwtTokenAction } from "../token/JwtTokenAction";
import { IAuthUser } from "../../interface/auth/IAuthUser";


export class AuthMiddleWareAction {

    jwtTokenAction = new JwtTokenAction()

    public authenticate = async (req: Request, res: Response, next: NextFunction, accessPoint: AccessPointEnum) => {

        let token = req.headers.authenticate + "" || "";
        let timeZone = req.headers.tz || ""


        res.locals.tz = timeZone
        await this.authenticateCheck(res, token, accessPoint, next)



    }

    private authenticateCheck = async (res: Response, token: string, accessPoint: AccessPointEnum, next: NextFunction,) => {

        switch (accessPoint) {
            case AccessPointEnum.Public:
                this.validatePublicToken(token, _config.static_key.public, next)
                break;
            case AccessPointEnum.Private:
                await this.validatePrivateToken(res, token, _config.secret_key.private, next)
                break;
            default:
                break;
        }
    }


    private validatePrivateToken = async (res: Response, token: string, secret_key: string, next: NextFunction) => {

        let decodedToken = await this.jwtTokenAction.verifyAndDecodedToken<IAuthUser>(res, token, secret_key)

        decodedToken.extra.timeZone = res.locals.tz
        res.locals.authUser = decodedToken
        next()

    }

    private validatePublicToken = (token: string, secret_key: string, next: NextFunction) => {
        if (token == secret_key) {
            next()
        }
        throw new BusinessException("Unauthorize Access", 401)
    }


}
