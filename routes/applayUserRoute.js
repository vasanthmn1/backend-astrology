const express = require('express')
const { applyAstro, getAllNotification, delAllNotification, delnotification, getnotification } = require('../controller/applyAstrologyctrl')
// const { registerUser, loginUser } = require('../controller/userCtrl')

const routes = express.Router()


routes.post('/apply', applyAstro)
routes.post('/readnoti', getAllNotification)
routes.post('/deleteallnoti', delAllNotification)
routes.get('/notifications/:id', getnotification)




module.exports = routes