const express = require('express')
const { registerUser, loginUser } = require('../controller/userCtrl')

const routes = express.Router()


routes.post('/register', registerUser)
routes.post('/login', loginUser)


module.exports = routes