import { NextFunction, Request, Response } from "express";
import { AuthMiddleWareAction } from "../action/auth/AuthMiddleWareAction";
import { AccessPointEnum } from "../enum/AccessPointEnum";


export class AuthMiddleWare {

    authMiddleWareAction = new AuthMiddleWareAction()

    publicAccessMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        await this.authMiddleWareAction.authaticate(req, res, next, AccessPointEnum.Public)
    }
    privateAccessMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        await this.authMiddleWareAction.authaticate(req, res, next, AccessPointEnum.Private)
    }
}   
