import { IAuthUser } from "../../interface/auth/IAuthUser";
import { IApplication } from "../../interface/db/entity/IApplication";
import { IApplicationParams } from "../../interface/params/IApplicationParams";
import { _dateUtils } from "../../lib/utils/_dateUtils";
import { _mongooseUtils } from "../../lib/utils/_mongoUtils";
import { HelperChild } from "./helper";

export class Persist extends HelperChild {


    save = async (authUser: IAuthUser, applicationParams: IApplicationParams): Promise<string> => {

        applicationParams
        let application = this.setDefaultValue()

        application = {
            ...application,
            phone: applicationParams.phone,
            address: applicationParams.address,
            user_id: authUser.user.id,


        }
        let dbSaveData = await this.p.applicationDao.saveEntity(application)

        if (!dbSaveData) {
            throw new Error("Unable to save application")
        }
        return "Application Submitted Successfully"
    }

    private setDefaultValue = (): IApplication => {
        return {
            _id: _mongooseUtils.createObjectId(),
            delete: false,
            status: "Pending",
            created_date: _dateUtils.getTimestamp(),
            updated_date: _dateUtils.getTimestamp(),
        } as IApplication
    }
}