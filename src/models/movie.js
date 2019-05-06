const mongoose = require('mongoose')
const validator = require('validator')

const movieSchema = new mongoose.Schema({
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
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie