import { DbBasic, DbDate } from "./DbBasic";


export interface IUser extends DbBasic, DbDate {

    name: string;
    email: string;
    password: string;

    isDelete: boolean;

    isVerify: boolean;
    verify_code: string;
    block: boolean;

    access_permission: string

}