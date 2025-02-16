import Zodiac from "../../db/entity/Zodiac";
import { IAuthUser } from "../../interface/auth/IAuthUser";
import { ZodiacListParams } from "../../interface/params/zodiac/IZodiacListParams";
import { IListResponse } from "../../interface/response/IListResponse";
import { ZodiacRow } from "../../interface/response/IZodiacRow";
import { HelperChild } from "./helper";

export class List extends HelperChild {

    fetchList = async (authUser: IAuthUser, params: ZodiacListParams): Promise<IListResponse<ZodiacRow>> => {

        //   this.p.validate.listValidateParams(params)

        let qry = this.p.qryList.listQry(authUser, params)

        let result = await Zodiac.aggregate<IListResponse<ZodiacRow>>(qry)



        if (!result || result.length == 0) {

            return {
                list: [] as any,
                count: 0,
            }
        }

        return result[0]
    }

}