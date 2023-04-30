const express = require('express')
const { applyAstro } = require('../controller/applyAstrologyctrl')
// const { registerUser, loginUser } = require('../controller/userCtrl')

const routes = express.Router()


routes.post('/apply', applyAstro)



module.exports = routes