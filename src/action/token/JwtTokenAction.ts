import jwt from 'jsonwebtoken'
import { BusinessException } from '../../lib/helper/BusinessException'
import { Response } from 'express'
import { access } from 'fs'
import _config from '../../config/config'
import { _static_const } from '../../lib/constants/_static'
import { tokenConst } from '../../lib/constants/token_const'

export class JwtTokenAction {


    generateToken = (user: any) => {

        return jwt.sign(
            {
                user: {
                    id: user.id,
                    email: user.email,
                    permission: user.access_permission,
                    name: user.name,
                },
            },
            _config.secret_key.private,
            { expiresIn: _static_const.token.expireTime.oneDay }
        );
    }


    verifyAndDecodedToken = async  <T>(res: Response, token: string, secret: string): Promise<T> => {

        return await new Promise((resolve, reject) => {

            jwt.verify(token, secret, (err, decoded) => {

                if (err) {
                    throw new BusinessException("Unauthorize Access", 401)
                }
                resolve(decoded as T)
            })
        })


    }


}