const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const reservationSchema = new Schema({
    startAt: {
        type: String,
        required: true,
        trim: true
    },
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
        type: Schema.Types.ObjectId, ref: 'Movie',
        required: true
    },
    cinemaId: {
        type: Schema.Types.ObjectId, ref: 'Cinema',
        required: true
    }
})

const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation