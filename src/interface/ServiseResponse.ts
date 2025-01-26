
export interface ServiceResponse {
    data: any
    message: string
    code: number
    status: "success" | "error"
}