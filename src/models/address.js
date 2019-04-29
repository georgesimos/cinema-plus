const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    number: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    zip: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    city: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },


})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address