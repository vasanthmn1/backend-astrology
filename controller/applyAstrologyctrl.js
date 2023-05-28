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
        const user = await userModel.findOne()
        const notifaction = admin.notifaction
        notifaction.push({
            type: "apply-request",


            message: `${newApplay.name} He Applayed  `,
            userId: newApplay._id,
            data: {
                name: newApplay.name,
                email: newApplay.email,
                address: newApplay.address,
                times: newApplay.times,
                date: newApplay.date,
                status: newApplay.status,
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

const getnotification = asyncCntrol(async (req, res) => {


    try {


        // const admin = await userModel.findOne({ isAdmin: true })
        const admin = await userModel.findOne({ isAdmin: true });
        const userId = req.params.id;
        console.log(userId);
        const user = admin.notifaction.map(notification => notification)
        console.log('User:', user);
        // user.notifaction = user.notifaction.filter(notification => notification.userId !== notificationId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: "Notification deleted",
            user,
        });
    } catch (error) {
        console.log(error);
        // res.status(500).json({
        //     message: "An error occurred",
        // });
    }
})


// const user = await userModel.findOneAndUpdate(
//     { userId: notificationId },
//     { $pull: { notifaction: { userId: notificationId } } },
//     { new: true }
// );
// console.log(user)
// if (!user) {
//     return res.status(400).json({
//         message: "User not found",
//         user,

//     });
// }
// const user = await userModel.findByIdAndRemove(notificationId);
// const userId = req.params.userId;
// const user = await userModel.findByIdAndUpdate(
//     userId,
//     { $pull: { notifaction: { _id: notificationId } } },
//     { new: true }
// );
// const userId = '644e58db9fd648097a911573';
// const user = await userModel.findOneAndRemove(
//     { notifaction: { userId: notificationId } },

// );

module.exports = {
    applyAstro,
    getAllNotification,
    delAllNotification,
    getnotification

}  // if (!user) {
    //     return res.status(400).json({
    //         message: "User not found",
    //     });
    // }

    // const notificationIndex = user.notifaction.findIndex(
    //     (notification) => notification.userId === notificationId
    // );

    // if (notificationIndex === -1) {
    //     return res.status(400).json({
    //         message: "Notification not found",
    //     });
    // }

    // user.notifaction.splice(notificationIndex, 1);
    // await user.save();
  // try {
    //     const user = await userModel.findById(req.params.userId)        // const seenotifi = user.seenotnotifaction
    //     // const notification = user.notifaction
    //     // if (user) {
    //     // user.notifaction = []
    //     // const updateUser = await user.save()

    //     // updateUser.password = undefined

    //     res.status(200).json({
    //         message: "All notifications deleted",
    //         data: user
    //     })
    //     // } else {
    //     res.status(404).json({
    //         message: "User not found",
    //         data: null
    //     })
    //     // }
    // } catch (error) {
    //     console.log(error);
    // }