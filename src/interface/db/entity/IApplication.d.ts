import { DbBasic, DbDate } from "./DbBasic"


export interface IApplication extends DbBasic, DbDate {
    user_id: string
    phone: string
    address: string

    delete: boolean
    status: string
}