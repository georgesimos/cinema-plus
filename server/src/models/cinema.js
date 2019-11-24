const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cinemaSchema = new Schema({
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
    },
    image: {
        type: String,
      },
})

const Cinema = mongoose.model('Cinema', cinemaSchema)

module.exports = Cinema