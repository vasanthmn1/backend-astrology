import { Request, Response } from "express"
import { _ctrlUtils } from "../../lib/utils/_ctrlUtils"
import { AccountAction } from "../../action/account/AccountAction"

export class AccountCtrl {

    accountAction = new AccountAction()


    registerUser = (req: Request, res: Response) => {
        _ctrlUtils.invokeAccount(req, res, async () => {
            let user = req.body || {}
            return await this.accountAction.register.createUser(user)
        }, "Register Success")

    }

    login = (req: Request, res: Response) => {

        _ctrlUtils.invokeAccount(req, res, async () => {
            let user = req.body || {}
            return await this.accountAction.login.login(user)
        }, "Register Success")

    }

}