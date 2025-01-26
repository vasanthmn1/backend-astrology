import Application from "../../../db/entity/Application";
import { IApplication } from "../../../interface/db/entity/IApplication";
import { DbAction } from "../DBAction";


export class ApplicationDao extends DbAction<IApplication> {
    constructor() {
        super(Application,)
    }
}