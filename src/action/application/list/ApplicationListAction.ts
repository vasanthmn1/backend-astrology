import { SimpleHelper } from "../../../abstract/SimpleHelper"
import Application from "../../../db/entity/Application"
import { IAuthUser } from "../../../interface/auth/IAuthUser"
import { ApplicationListParams } from "../../../interface/params/IApplicationListParams"
import { IApplicationRow } from "../../../interface/response/IApplicationRow"
import { IListResponse } from "../../../interface/response/IListResponse"
import { QueryBuilder } from "./qry/QryBuilder"



export class ApplicationListAction {

    qry = new QueryBuilder()

    applications = async (authUser: IAuthUser, applicationListParams: ApplicationListParams): Promise<IListResponse<IApplicationRow>> => {

        let query = this.qry.listQry(authUser, applicationListParams)

        let applications = await Application.aggregate<IListResponse<IApplicationRow>>(query)

        if (!applications || applications.length == 0) {
            return {
                list: [] as any,
                count: 0,
                // : "No applications found"
            }

        }
        return applications[0]
    }
}


