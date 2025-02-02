import { Model } from "mongoose";
import { DbBasic } from "../../interface/db/entity/DbBasic";




export class DbAction<T extends DbBasic> {
    private entity: Model<T>;

    constructor(entity: Model<T>,) {
        this.entity = entity;
    }
    saveEntity = async (entityData: T) => {

        if (!entityData || !entityData._id) {
            throw new Error("Invalid data or missing data");
        }

        return await this.entity.findOneAndUpdate(
            { _id: entityData._id },
            { $set: entityData },
            { upsert: true, 'new': true, runValidators: true }
        )
    }
    updateEntity = async (entityData: T) => {

        if (!entityData || !entityData._id) {
            throw new Error("Invalid data or missing data");
        }

        return await this.entity.findOneAndUpdate(
            { _id: entityData._id },
            { $set: entityData },
            { upsert: false, 'new': true, runValidators: true }
        )
    }


}
