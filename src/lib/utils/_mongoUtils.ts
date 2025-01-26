import mongoose from "mongoose";
import { BusinessException } from "../helper/BusinessException";

export let _mongooseUtils = {
    //write mongoutils

    isValidObjectId: (id: string) => {
        return mongoose.Types.ObjectId.isValid(id);
    },
    createObjectId: (): mongoose.Types.ObjectId => {
        return new mongoose.Types.ObjectId()

    },
    getObjectId: (id: string): mongoose.Types.ObjectId => {

        if (_mongooseUtils.isValidObjectId(id)) {
            return new mongoose.Types.ObjectId(id);
        }

        throw new BusinessException("Invalid ID")
    }
}