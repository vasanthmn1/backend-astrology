import express from 'express'
import { ZodiacCtrl } from '../controller/zodiac/ZodiacCtrl'

let router = express.Router()

let zodiacCtrl = new ZodiacCtrl()

//Public Access
router.get("/get/:id", zodiacCtrl.get)
router.post("/list", zodiacCtrl.fetchList)
router.post("/save", zodiacCtrl.save)


//Private Access For Admin
router.post("/delete/:id", zodiacCtrl.delete)




export default router