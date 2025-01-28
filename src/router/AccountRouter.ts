import express from 'express'
import { AccountCtrl } from '../controller/account/AccountCtrl'

const routes = express.Router()


let accountCtrl = new AccountCtrl()

routes.post('/login', accountCtrl.login)
routes.post('/signup', accountCtrl.registerUser)


export default routes