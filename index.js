const express = require('express')
const colors = require('colors')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const DB = require('./config/ConntingDB')
const userroutes = require('./routes/userRoutes')
const applayUserRoute = require('./routes/applayUserRoute')

const app = express()



DB()

app.use(cors())
app.use(cors(
    {
        origin: "*",
    }
))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))




app.use('/auth', userroutes)
app.use('/user', applayUserRoute)

// app.use('/auth', userroutes)
// 






app.listen(port, () => {
    console.log(`connting Port ${port}`);
})