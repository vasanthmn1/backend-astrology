const express = require('express')
const colors = require('colors')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const DB = require('./config/ConntingDB')
const userroutes = require('./routes/userRoutes')
const applayUserRoute = require('./routes/applayUserRoute')
const multer = require('multer')
const path = require('path')

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

app.use('/images', express.static(path.join(__dirname, '/images')))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    }, filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage })

app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json("file uploades success")
})


app.use('/auth', userroutes)
app.use('/user', applayUserRoute)

// app.use('/auth', userroutes)
// 






app.listen(port, () => {
    console.log(`connting Port ${port}`);
})