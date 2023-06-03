const mongoose = require('mongoose')

const zodiaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    poto: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
    },
    date: {
        type: Object,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('Zodia', zodiaSchema)