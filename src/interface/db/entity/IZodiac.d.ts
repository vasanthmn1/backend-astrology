import { DbBasic, DbDate } from "./DbBasic"

export interface IZodiac extends DbBasic, DbDate {

    title: string
    photo: CLOUDINARYPhoto
    delete: boolean
    description: string
    created_date: string
    updated_date: string

}

export interface CloudinaryPhoto {
    public_id: string
    url: string
}