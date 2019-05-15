const mongoose = require('mongoose')


const Schema = mongoose.Schema;
const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    language: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    genre: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    director: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    cast: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    duration: {
        type: Number,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie