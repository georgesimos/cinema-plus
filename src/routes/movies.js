const express = require('express')
const Movie = require('../models/movie')

const router = new express.Router()

// Create a movie
router.post('/movies', async (req, res) => {
    const movie = new Movie(req.body)
    try {
        await movie.save()
        res.status(201).send(movie)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router