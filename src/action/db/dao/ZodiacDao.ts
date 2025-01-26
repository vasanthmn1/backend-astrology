import Application from "../../../db/entity/Application";
import Zodiac from "../../../db/entity/Zodiac";
import { IApplication } from "../../../interface/db/entity/IApplication";
import { IZodiac } from "../../../interface/db/entity/IZodiac";
import { DbAction } from "../DBAction";


export class ZodiacDao extends DbAction<IZodiac> {
    constructor() {
        super(Zodiac)
    }
}