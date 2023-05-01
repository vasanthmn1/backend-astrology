const asyncCntrol = require('express-async-handler')
const bcryptjs = require('bcryptjs');
const userModel = require('../model/userModel');
const jsonwebtoken = require('jsonwebtoken')



// ! Register
const registerUser = asyncCntrol(async (req, res) => {
    try {
        const { username, email, password } = req.body
        const alreadyuser = await userModel.findOne({ email })
        if (alreadyuser) {
            return res.status(400).json({
                massage: "alreay email exisites"
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashpassword = await bcryptjs.hash(password, salt)

        const newUser = await userModel.create({
            username,
            email,
            password: hashpassword
        })

        res.status(200).json(
            { _id: newUser.id, username, email }
        )



    } catch (error) {
        console.log(error.message);
    }
})

// ! login

const loginUser = asyncCntrol(async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(400).json({
                massage: "user Not Found"
            })
        }
        const token = jsonwebtoken.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '6d' })
        if (user && (await bcryptjs.compare(password, user.password))) {
            const { password, ...others } = user._doc
            res.json({
                user: {
                    user: others,
                    token
                }
            })
        }
    } catch (error) {

    }
})

const getAdmin = asyncCntrol(async (req, res) => {
    const user = await userModel.findOne({ isAdmin: true })


    res.status(200).json({
        user
    })
})





module.exports = {
    loginUser,
    registerUser,
    getAdmin
}