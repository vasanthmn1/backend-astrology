import mongoose from "mongoose"
import { IUser } from '../../interface/db/entity/IUser';
import { _dbUtils } from '../../lib/utils/_dbUtils';

const userSchema = new mongoose.Schema<IUser>({

    name: _dbUtils.trimString(),
    email: { ..._dbUtils.trimString(), unique: true },
    password: { type: String, required: true },

    is_delete: { type: Boolean, required: true },
    block: { type: Boolean, required: true },

    verify_code: { type: String, required: true },
    is_verify: { type: Boolean, required: true },

    access_permission: _dbUtils.trimString(),

    created_date: { type: String, required: true },
    updated_date: { type: String, required: true }

});
const user = mongoose.model<IUser>('User', userSchema);

export default user;
