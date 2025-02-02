
import mongoose from "mongoose"

export interface DbBasic {
    _id: string;
}

export interface DbDate {
    created_date: string;
    updated_date: string;
}