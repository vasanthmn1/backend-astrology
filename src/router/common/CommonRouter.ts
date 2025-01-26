import express from 'express'
import { ApplicationListAction } from '../../action/application/list/ApplicationListAction'
import { ApplicationCtl } from '../../controller/application/ApplicationCtrl'
import { ZodiacCtrl } from '../../controller/zodiac/ZodiacCtrl'


let router = express.Router()


let application = new ApplicationCtl()
let zodiac = new ZodiacCtrl()

router.post('/applications', application.applications)

export default router