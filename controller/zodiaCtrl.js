const asyncCntrol = require('express-async-handler')
const zodiacModel = require('../model/zodiacModel');

const createpost = asyncCntrol(async (req, res) => {
    try {
        const newPost = await zodiacModel.create(req.body)

        res.status(200).json(newPost)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})

const getpost = asyncCntrol(async (req, res) => {
    try {
        const getPost = await zodiacModel.find()
        res.status(200).json(getPost)
    } catch (error) {
        res.status(400)
        throw new Error(error)
    }
})
module.exports = {
    createpost,
    getpost
}