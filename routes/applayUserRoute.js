const express = require('express')
const { applyAstro, getAllNotification, delAllNotification, delnotification, apporvednotification, userdelnotification, getuserall, delusersinglenotification } = require('../controller/applyAstrologyctrl')

// const { registerUser, loginUser } = require('../controller/userCtrl')

const routes = express.Router()


routes.post('/apply', applyAstro)
routes.post('/readnoti', getAllNotification)
routes.post('/deleteallnoti', delAllNotification)
routes.delete('/delnotifications/:id', delnotification)
routes.post('/appoverdnotifications/:id', apporvednotification)
routes.put('/userdelnotification/:id', userdelnotification)
routes.get('/usergetall/:id', getuserall)
routes.delete('/:id/notifications/:notificationId', delusersinglenotification)


module.exports = routes