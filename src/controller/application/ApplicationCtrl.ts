import { Request, Response } from "express"
import { _ctrlUtils } from "../../lib/utils/_ctrlUtils"
import { ApplicationAction } from "../../action/application/ApplicationAction"
import { ApplicationDao } from "../../action/db/dao/ApplicationDao"
import { ApplicationListAction } from "../../action/application/list/ApplicationListAction"


export class ApplicationCtl {

    applicationAction = new ApplicationAction()
    applicationListAction = new ApplicationListAction()


    applyForm = (req: Request, res: Response,) => {
        _ctrlUtils.invoke(req, res, async (authUser) => {
            let data = req.body || {}
            return this.applicationAction.apply(authUser, data)
        }, "Form Apply Success")
    }

    //common _access
    applications = (req: Request, res: Response) => {
        _ctrlUtils.invoke(req, res, async (authUser) => {

            let data = req.body || {}
            return this.applicationListAction.applications(authUser, data)
        }, "Form Apply Success")
    }

    //flag

    //    approve ,reject,



}