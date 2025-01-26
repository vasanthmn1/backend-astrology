import { DbBasic, DbDate } from "./DbBasic";


export interface IUser extends DbBasic, DbDate {

    name: string;
    email: string;
    password: string;

    is_delete: boolean;

    is_verify: boolean;
    verify_code: string;
    block: boolean;

    access_permission: string

}