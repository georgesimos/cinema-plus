const mongoose = require('mongoose')

const cinemaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    seats: {
        type: [Schema.Types.Mixed],
        required: true
    },
    seatsAvailable: {
        type: Number,
        required: true
    }
})

const Cinema = mongoose.model('Cinema', cinemaSchema)

module.exports = Cinema