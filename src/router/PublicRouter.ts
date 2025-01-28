
import express from 'express'
import { ZodiacCtrl } from '../controller/zodiac/ZodiacCtrl'

const routes = express.Router()

let zodiacCtrl = new ZodiacCtrl()

routes.get("/zodiac/get/:id", zodiacCtrl.get)
routes.get("/zodiac/list", zodiacCtrl.fetchList)


export default routes