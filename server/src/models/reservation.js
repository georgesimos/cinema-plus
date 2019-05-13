const mongoose = require('mongoose')

const reservationSchema = new mongoose.Schema({
    seats: {
        type: [Schema.Types.Mixed],
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    movieId: {
        type: Schema.Types.ObjectId, ref: 'Movie'
    },
    cinemaId: {
        type: Schema.Types.ObjectId, ref: 'Cinema'
    }
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation