const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const showtimeSchema = new Schema({
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
        type: Schema.Types.ObjectId, ref: 'Movie',
        required: true
    },
    cinemaId: {
        type: Schema.Types.ObjectId, ref: 'Cinema',
        required: true
    }
})

const Showtime = mongoose.model('Showtime', showtimeSchema)

module.exports = Showtime