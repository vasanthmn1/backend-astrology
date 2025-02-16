
export interface ServiceResponse {
    result: any
    message: string
    code: number
    status: "success" | "error"
}