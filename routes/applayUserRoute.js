const express = require('express')
const { applyAstro, getAllNotification, delAllNotification, delnotification } = require('../controller/applyAstrologyctrl')
// const { registerUser, loginUser } = require('../controller/userCtrl')

const routes = express.Router()


routes.post('/apply', applyAstro)
routes.post('/readnoti', getAllNotification)
routes.post('/deleteallnoti', delAllNotification)
routes.delete('/delnotifications/:id', delnotification)




module.exports = routes