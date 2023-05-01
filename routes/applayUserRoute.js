const express = require('express')
const { applyAstro, getAllNotification } = require('../controller/applyAstrologyctrl')
// const { registerUser, loginUser } = require('../controller/userCtrl')

const routes = express.Router()


routes.post('/apply', applyAstro)
routes.post('/readnoti', getAllNotification)


module.exports = routes