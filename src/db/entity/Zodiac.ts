import { CloudinaryPhoto, IZodiac } from "../../interface/db/entity/IZodiac";
import mongoose, { Schema } from "mongoose";


const photoSchema = new Schema({
    public_id: { type: String, required: true },
    url: { type: String, required: true },
});

const zodiacSchema = new mongoose.Schema<IZodiac>({

    title: { type: String, required: true },
    photo: photoSchema,
    description: { type: String },



})

const zodiac = mongoose.model<IZodiac>('Zodiac', zodiacSchema);
export default zodiac;