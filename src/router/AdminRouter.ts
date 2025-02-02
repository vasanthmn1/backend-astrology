import express from 'express'

let router = express.Router()
import ZodiacRoutes from '../router/ZodiacRoutes'



//list off application
router.get("/zodiac", ZodiacRoutes)
router.get("/application", ZodiacRoutes)




export default router