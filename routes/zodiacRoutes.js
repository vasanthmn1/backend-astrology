const express = require('express')
const { createpost, getpost } = require('../controller/zodiaCtrl')
// const { registerUser, loginUser, getAdmin, getAllUser } = require('../controller/userCtrl')

const routes = express.Router()
routes.post('/create', createpost)
routes.get('/get', getpost)





module.exports = routes