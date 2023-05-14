const asyncCntrol = require('express-async-handler')
const bcryptjs = require('bcryptjs');
const userModel = require('../model/userModel');
const jsonwebtoken = require('jsonwebtoken');
const adminModel = require('../model/adminModel');
const { response } = require('express');

const applyAstro = asyncCntrol(async (req, res) => {
    try {

        const newApplay = await adminModel.create({ ...req.body, status: "pending" })

        const admin = await userModel.findOne({ isAdmin: true })

        const notifaction = admin.notifaction
        notifaction.push({
            type: "apply-doctor-request",
            message: `${newApplay.name} He Applayed  `,
            data: {
                userId: newApplay._id,
                name: newApplay.name,
                email: newApplay.email,
                address: newApplay.address,
                times: newApplay.times,
                date: newApplay.date,
                onclickPath: '/user/apply'
            }
        })
        await userModel.findByIdAndUpdate(admin._id, {
            notifaction
        })
        res.status(200).json({
            message: "apply Suceess",

        })
        // await admin.findByIdAndUpdate({
        //     // admin._id,
        //     // {notifaction}
        // })
        // if (!user) {
        //     return res.status(400).json({
        //         massage: "user Not Found"
        //     })
        // }

    } catch (error) {
        console.log(error);
    }
})

const getAllNotification = asyncCntrol(async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })

        const seenotifi = user.seenotnotifaction
        const notification = user.notifaction
        seenotifi.push(...notification)
        user.notifaction = []
        user.seenotnotifaction = seenotifi

        const updateuser = await user.save()

        res.status(200).json({

            message: "all notification read",
            data: updateuser
        })
    } catch (error) {
        console.log(error);
    }
})

const delAllNotification = asyncCntrol(async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        // const seenotifi = user.seenotnotifaction
        // const notification = user.notifaction
        if (user) {
            user.notifaction = []
            user.seenotnotifaction = []
            const updateUser = await user.save()

            updateUser.password = undefined

            res.status(200).json({
                message: "All notifications deleted",
                data: updateUser
            })
        } else {
            res.status(404).json({
                message: "User not found",
                data: null
            })
        }
    } catch (error) {
        console.log(error);
    }
})




module.exports = {
    applyAstro,
    getAllNotification,
    delAllNotification

}