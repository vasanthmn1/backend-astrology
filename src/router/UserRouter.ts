import express from 'express'
import { ApplicationCtl } from '../controller/application/ApplicationCtrl'


let router = express.Router()


let applicationCtl = new ApplicationCtl()

router.post('/apply', applicationCtl.applyForm)



export default router