import { PipelineStage } from "mongoose";
import { IAuthUser } from "../../../../interface/auth/IAuthUser";
import { ApplicationListParams } from "../../../../interface/params/IApplicationListParams";
import { _utils } from "../../../../lib/utils/_utils";
import { paginationAction } from "../../../pagination/Pagination";
import { Match } from "./Match";


export class QueryBuilder {

    match = new Match(this)

    listQry = (authUser: IAuthUser, applicationListParams: ApplicationListParams): Array<PipelineStage> => {

        let pipeline: Array<PipelineStage> = [

        ]


        //move to match class ===
        let match: any = {
            "is_delete": false
        }

        if (authUser.user.permission != "admin") {
            match["user_id"] = authUser.user.id
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

        pipeline.push({
            "$lookup": {
                from: "user",
                foreignField: "_id",
                localField: "user_id",
                as: "user_table",

            },

        }, {
            "$unwind": { path: "user_table", preserveNullAndEmptyArrays: true }
        })


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
                                "email": "$user_table.email",
                                "phone": 1,
                                "address": 1,
                                "status": 1,
                                "created_date": 1,
                                "user_id": 1,
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

// {
//     "$skip": (applicationListParams.pageNumber - 1) * applicationListParams.pageLength
// },
// {
//     "$limit": applicationListParams.pageLength
// }