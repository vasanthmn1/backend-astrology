import mongoose from "mongoose";
import { _dbUtils } from "../../lib/utils/_dbUtils";
import { IApplication } from "../../interface/db/entity/IApplication";



const applicationSchema = new mongoose.Schema<IApplication>({

    user_id: _dbUtils.trimString(),


    delete: { type: Boolean, required: true },

    address: _dbUtils.trimString(),
    phone: _dbUtils.trimString(),
    status: _dbUtils.trimString(),

    available_date: _dbUtils.trimString(),

    created_date: { type: String, required: true },
    updated_date: { type: String, required: true }

});
const Application = mongoose.model<IApplication>('Application', applicationSchema);

export default Application;
