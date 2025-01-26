import { PipelineStage } from "mongoose"
import { _utils } from "../../../lib/utils/_utils"
import { paginationAction } from "../../pagination/Pagination"
import { IAuthUser } from "../../../interface/auth/IAuthUser"
import { ZodiacListParams } from "../../../interface/params/zodiac/IZodiacListParams"

export class QryList {


    listQry = (authUser: IAuthUser, applicationListParams: ZodiacListParams): Array<PipelineStage> => {

        let pipeline: Array<PipelineStage> = [

        ]


        //move to match class ===
        let match: any = {
            "is_delete": false
        }

        if (!_utils.isEmpty(applicationListParams.search)) {
            match["$or"] = [
                { "email": { $regex: applicationListParams.search, $options: 'i' } },
            ]
        }

        pipeline.push({ "$match": match })

        //======


        //### after change Sort  use class create Sort Function

        let sort: any = {}
        sort[applicationListParams.sortBy] = applicationListParams.sortOrder == 1 ? 1 : -1


        let pagination = paginationAction.pagination(applicationListParams.pageLength, applicationListParams.pageNumber)
        pipeline.push(
            { "$sort": sort },
            {

                "$facet": {
                    "count": [
                        {
                            "$group": {
                                "_id": null,
                                "count": { "$sum": 1 }
                            }
                        }
                    ],
                    "data": [
                        { "$skip": pagination.pageNumber },
                        { "$limit": pagination.pageLength },

                        {
                            "$project": {
                                "_id": 1,
                                "title": 1,
                                "photo": 1,
                                "description": 1,
                                "created_date": 1
                            }
                        }
                    ]

                }
            },
            {
                "$unwind": "$stage_count"
            },
            {
                "$project": {
                    "count": "$count.count",
                    "list": "$data"
                }
            }
        )



        return pipeline;
    }




}