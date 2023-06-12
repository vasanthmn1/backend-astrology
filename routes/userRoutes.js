const express = require('express')
const { registerUser, loginUser, getAdmin, getAllUser } = require('../controller/userCtrl')

const routes = express.Router()


routes.post('/register', registerUser)
routes.post('/login', loginUser)
routes.get('/getadmin', getAdmin)
routes.get('/getall', getAllUser)


module.exports = routes