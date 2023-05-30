const asyncCntrol = require('express-async-handler')
const bcryptjs = require('bcryptjs');
const userModel = require('../model/userModel');
const jsonwebtoken = require('jsonwebtoken');
const adminModel = require('../model/adminModel');


const applyAstro = asyncCntrol(async (req, res) => {
    try {
        const { email } = req.body;
        const newApply = await adminModel.create({ ...req.body, status: "pending" });

        const admin = await userModel.findOne({ isAdmin: true });
        const user = await userModel.findOne({ email: newApply.email });

        const adminNotification = admin.notifaction;
        adminNotification.push({
            type: "apply-request",
            message: `${newApply.name} has applied`,
            data: {
                userId: newApply._id,
                name: newApply.name,
                email: newApply.email,
                address: newApply.address,
                times: newApply.times,
                date: newApply.date,
                status: newApply.status,
                onclickPath: '/user/apply'
            }
        });

        const userNotification = user.notifaction;
        userNotification.push({
            type: "apply-request",
            message: "Your application has been submitted successfully",
            data: {
                userId: newApply._id,
                name: newApply.name,
                email: newApply.email,
                address: newApply.address,
                times: newApply.times,
                date: newApply.date,
                status: newApply.status,
                onclickPath: '/user/apply'
            }
        });

        await userModel.findByIdAndUpdate(user._id, { notifaction: userNotification });

        await userModel.findByIdAndUpdate(admin._id, { notifaction: adminNotification });

        res.status(200).json({
            message: "Application submitted successfully",
            user
        });
    } catch (error) {
        console.log(error);
    }
});

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

// const delnotification = asyncCntrol(async (req, res) => {
//     try {

//         // const admin = await userModel.findOne({ isAdmin: true })
//         const admin = await userModel.findOne({ isAdmin: true });

//         const userId = req.params.id;


//         const userIndex = admin.notifaction.findIndex(notification => String(notification.data.userId) === userId);


//         if (userIndex === -1) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const newApplay = await adminModel.findOneAndUpdate({ _id: userId }, { $set: { status: 'Reject' } }, { new: true });


//         const newsa = await userModel.findOne({ email: newApplay.email })
//         if (!newsa || !newsa.notifaction) {
//             return res.status(404).json({ message: 'User not found or notification not available' });
//         }

//         await userModel.updateOne(
//             { _id: newsa._id, 'notifaction.data.userId': userId },
//             { $set: { 'notifaction.$.data.status': 'Reject' } }
//         );

//         const userApplay = await userModel.findOne({ email: newApplay.email });


//         await userApplay.save();

//         if (!admin.notifaction) {
//             admin.notifaction = [];
//         }



//         const deletedUser = admin.notifaction.splice(userIndex, 1);
//         await admin.save();
//         // console.log(userApplay)


//         res.status(200).json({
//             message: "Notification deleted",
//             deletedUser,
//             userApplay
//         });
//     } catch (error) {
//         console.log(error);
//     }
// })
const delnotification = asyncCntrol(async (req, res) => {
    try {
        const admin = await userModel.findOne({ isAdmin: true });
        const userId = req.params.id;




        const newApplay = await adminModel.findOneAndUpdate({ _id: userId }, { $set: { status: 'Reject' } }, { new: true });
        const newsa = await userModel.findOne({ email: newApplay.email });


        const userIndex = newsa.notifaction.findIndex(notification => String(notification.data.userId) === userId);


        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }


        if (!newsa || !newsa.notifaction || !newsa.notifaction[userIndex]) {
            return res.status(404).json({ message: 'User not found or notification not available', userIndex });
        }

        newsa.notifaction[userIndex].data.status = 'Reject'
        console.log("hello", newsa.notifaction)
        await userModel.updateOne(
            { _id: newsa._id },
            { $set: { notifaction: newsa.notifaction } }
        );


        const userApplay = await userModel.findOne({ email: newApplay.email });

        if (!admin.notifaction) {
            admin.notifaction = [];
        }

        const deletedUser = admin.notifaction.splice(userIndex, 1);
        await admin.save();

        res.status(200).json({
            message: "Notification deleted",
            deletedUser,
            userApplay,
        });



    } catch (error) {
        console.log(error);
    }
});

module.exports = {
    applyAstro,
    getAllNotification,
    delAllNotification,
    delnotification

}  