const express = require('express')
const { registerUser, loginUser, getAdmin } = require('../controller/userCtrl')

const routes = express.Router()


routes.post('/register', registerUser)
routes.post('/login', loginUser)
routes.get('/getadmin', getAdmin)



module.exports = routes