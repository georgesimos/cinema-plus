const mongoose = require('mongoose')

const showtimeSchema = new mongoose.Schema({
    startAt: {
        type: String,
        required: true,
        trim: true
    },
    is3d: {
        type: Boolean,
        default: false
    },
    isImax: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    movieId: {
        type: Schema.Types.ObjectId, ref: 'Movie'
    },
    cinemaId: {
        type: Schema.Types.ObjectId, ref: 'Cinema'
    }
})

const Showtime = mongoose.model('Showtime', showtimeSchema)

module.exports = Showtime