import { Request, Response } from "express"
import { _ctrlUtils } from "../../lib/utils/_ctrlUtils"
import { ZodiacAction } from "../../action/zodiac/ZodiacAction"

export class ZodiacCtrl {

    zodiacAction = new ZodiacAction()

    get = (req: Request, res: Response,) => {
        _ctrlUtils.invoke(req, res, async (authUser) => {
            let id = req.params.id || ""
            return this.zodiacAction.getZodiac(authUser, id)
        }, "Form Apply Success")
    }

    fetchList = (req: Request, res: Response) => {
        _ctrlUtils.invoke(req, res, async (authUser) => {
            let data = req.body || {}
            return this.zodiacAction.list.fetchList(authUser, data)
        }, "Form Apply Success")
    }


}