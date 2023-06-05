const express = require('express')
const { createpost, getpost, delpost, editpost, getone } = require('../controller/zodiaCtrl')
// const { registerUser, loginUser, getAdmin, getAllUser } = require('../controller/userCtrl')

const routes = express.Router()
routes.post('/create', createpost)
routes.get('/get', getpost)
routes.get('/get/:id', getone)

routes.delete('/delete/:id', delpost)
routes.put('/edit/:id', editpost)





module.exports = routes