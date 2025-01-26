import { Request, Response } from "express";
import { IAuthUser } from "../../interface/auth/IAuthUser";
import { DisplayController } from "../../controller/display/DisplayControler";


export let _ctrlUtils = {


    invoke: (res: Response, req: Request, resultPromise: (authUser: IAuthUser) => Promise<any>, successMsg: string) => {

        try {
            let auth = res.locals.authUser
            let result = resultPromise(auth)
            let message = successMsg || ""

            DisplayController.getSuccess(req, res, result, message)

        } catch (error) {
            DisplayController.getError(req, res, error)
        }


    }
}