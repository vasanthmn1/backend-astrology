const asyncCntrol = require('express-async-handler')
const bcryptjs = require('bcryptjs');
const userModel = require('../model/userModel');
const jsonwebtoken = require('jsonwebtoken');
const adminModel = require('../model/adminModel');

const applyAstro = asyncCntrol(async (req, res) => {
    try {

        const newApplay = await adminModel.create({ ...req.body, status: "pending" })

        const admin = await userModel.findOne({ isAdmin: true })

        const notifaction = admin.notifaction
        notifaction.push({
            type: "apply-admin",
            message: `${newApplay.name} He Applayed  `,
            data: {
                adminId: newApplay._id,
                name: newApplay.name,
                onclickPath: '/admin'
            }
        })
        await userModel.findByIdAndUpdate(admin._id, {
            notifaction
        })
        res.status(200).json({
            message: "apply Sucess"
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







module.exports = {
    applyAstro,

}