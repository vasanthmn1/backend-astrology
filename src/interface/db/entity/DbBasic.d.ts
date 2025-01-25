
import mongoose from "mongoose"

export interface DbBasic {
    _id: mongoose.Types.ObjectId;
}

export interface DbDate {
    created_date: string;
    updated_date: string;
}