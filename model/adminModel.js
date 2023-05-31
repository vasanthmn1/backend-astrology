const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    softDelete: {
        type: Boolean,
        default: false
    },
    times: {
        type: Object,
        required: true
    },
    date: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true })

module.exports = mongoose.model('Admin', adminSchema)
