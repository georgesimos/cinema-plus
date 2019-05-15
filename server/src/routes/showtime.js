const express = require('express')
const Showtime = require('../models/showtime')

const router = new express.Router()

// Create a showtime
router.post('/showtime', async (req, res) => {
    const showtime = new Showtime(req.body)
    try {
        await showtime.save()
        res.status(201).send(showtime)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all showtimes
router.get('/showtime', async (req, res) => {
    try {
        const showtimes = await Showtime.find({})
        res.send(showtimes)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get showtime by id 
router.post('/showtime/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const showtime = await Showtime.findById(_id)
        !showtime ? res.sendStatus(404) : res.send(showtime)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Update showtime by id
router.patch('/showtime/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['startAt', 'is3d', 'isImax']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const showtime = await Showtime.findById(_id)
        updates.forEach((update) => showtime[update] = req.body[update])
        await showtime.save()
        !showtime ? res.sendStatus(404) : res.send(showtime)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete showtime by id 
router.delete('/showtime/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const showtime = await Showtime.findByIdAndDelete(_id)
        !showtime ? res.sendStatus(404) : res.send(showtime)
    } catch (e) {
        res.sendStatus(400)
    }
})

module.exports = router