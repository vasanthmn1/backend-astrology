const asyncCntrol = require('express-async-handler')
const bcryptjs = require('bcryptjs');
const userModel = require('../model/userModel');
const jsonwebtoken = require('jsonwebtoken');
const adminModel = require('../model/adminModel');


const applyAstro = asyncCntrol(async (req, res) => {
    try {
        const { email } = req.body
        const newApplay = await adminModel.create({ ...req.body, status: "pending" })

        const admin = await userModel.findOne({ isAdmin: true })
        const user = await userModel.findOne({ email })
        const notifaction = admin.notifaction
        notifaction.push({
            type: "apply-request",
            message: `${newApplay.name} He Applayed  `,
            data: {
                userId: newApplay._id,
                name: newApplay.name,
                email: newApplay.email,
                address: newApplay.address,
                times: newApplay.times,
                date: newApplay.date,
                status: newApplay.status,
                onclickPath: '/user/apply'
            }
        })
        console.log(user)
        await userModel.findByIdAndUpdate(admin._id, {
            notifaction
        })
        res.status(200).json({
            message: "apply Suceess",
            user
        })


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

const delnotification = asyncCntrol(async (req, res) => {


    try {


        // const admin = await userModel.findOne({ isAdmin: true })
        const admin = await userModel.findOne({ isAdmin: true });
        const userId = req.params.id;


        const userIndex = admin.notifaction.findIndex(notification => String(notification.data.userId) === userId);


        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }


        const newApplay = await adminModel.findOneAndUpdate({ _id: userId }, { $set: { status: 'Reject' } }, { new: true });
        // if (newApplay) {
        //     await newApplay.save()
        // }

        const deletedUser = admin.notifaction.splice(userIndex, 1);
        await admin.save();



        res.status(200).json({
            message: "Notification deleted",
            deletedUser,
            newApplay,
        });
    } catch (error) {
        console.log(error);
    }
})


module.exports = {
    applyAstro,
    getAllNotification,
    delAllNotification,
    delnotification

}  