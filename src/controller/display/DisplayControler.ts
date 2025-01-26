import { Request, Response } from "express"
import { ServiceResponse } from "../../interface/ServiseResponse"


export class DisplayController {


    static getSuccess = (req: Request, res: Response, successData: any, successMsg: string, statusCode?: number) => {

        let data = successData || {}
        let message = successMsg || ''
        let code = statusCode || 200

        let finalData = {
            status: "success",
            message,
            code,
            data,
        } as ServiceResponse
        return res.send(finalData).status(code)
    }

    static getError = (req: Request, res: Response, errorData: any, errMessage?: string, statusCode?: number) => {

        let data = errorData.message || {}
        let message = errMessage || ''
        let code = statusCode || 400

        let finalData = {
            data,
            message,
            code,
            status: "error",
        } as ServiceResponse

        return res.send(finalData).status(code)
    }


}