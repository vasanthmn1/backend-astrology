import { Request, Response } from "express"
import { ServiceResponse } from "../../interface/ServiceResponse"


export class DisplayController {


    static getSuccess = (req: Request, res: Response, successData: any, successMsg: string, statusCode?: number) => {

        let result = successData || {}
        let message = successMsg || ''
        let code = statusCode || 200

        let finalData = {
            status: "success",
            message,
            code,
            result,
        } as ServiceResponse
        return res.send(finalData).status(code)
    }

    static getError = (req: Request, res: Response, errorData: any, errMessage?: string, statusCode?: number) => {

        let result = errorData.message || {}
        let message = errMessage || ''
        let code = statusCode || 400

        let finalData = {
            result,
            message,
            code,
            status: "error",
        } as ServiceResponse

        return res.send(finalData).status(code)
    }


}