
import express from 'express'
import { ZodiacCtrl } from '../controller/zodiac/ZodiacCtrl'
import ZodiacRoutes from '../router/ZodiacRoutes'
const routes = express.Router()

let zodiacCtrl = new ZodiacCtrl()

routes.get("/zodiac", ZodiacRoutes)
routes.get("/zodiac", ZodiacRoutes)


export default routes