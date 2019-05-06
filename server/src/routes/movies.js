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

// Get all movies 
router.get('/movies', async (req, res) => {
    try {
        const movies = await Movie.find({})
        res.send(movies)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get movie by id
router.get('/movies/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const movie = await Movie.findById(_id)
        !movie ? res.sendStatus(404) : res.send(movie)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Update movie by id
router.patch('/movies/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'language', 'genre', 'director', 'cast', 'description', 'duration']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const movie = await Movie.findById(_id)
        updates.forEach((update) => movie[update] = req.body[update])
        await movie.save()
        !movie ? res.sendStatus(404) : res.send(movie)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete movie by id 
router.delete('/movies/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const movie = await Movie.findByIdAndDelete(_id)
        !movie ? res.sendStatus(404) : res.send(movie)
    } catch (e) {
        res.sendStatus(400)
    }
})

module.exports = router