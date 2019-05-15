const express = require('express')
const Cinema = require('../models/cinema')

const router = new express.Router()

// Create a cinema
router.post('/cinema', async (req, res) => {
    const cinema = new Cinema(req.body)
    try {
        await cinema.save()
        res.status(201).send(cinema)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all cinemas
router.get('/cinema', async (req, res) => {
    try {
        const cinemas = await Cinema.find({})
        res.send(cinemas)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get cinema by id 
router.post('/cinema/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const cinema = await Cinema.findById(_id)
        !cinema ? res.sendStatus(404) : res.send(cinema)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Update cinema by id
router.patch('/cinema/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'ticketPrice', 'city', 'seats', 'seatsAvailable']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const cinema = await Cinema.findById(_id)
        updates.forEach((update) => cinema[update] = req.body[update])
        await cinema.save()
        !cinema ? res.sendStatus(404) : res.send(cinema)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete cinema by id 
router.delete('/cinema/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const cinema = await Cinema.findByIdAndDelete(_id)
        !cinema ? res.sendStatus(404) : res.send(cinema)
    } catch (e) {
        res.sendStatus(400)
    }
})

module.exports = router