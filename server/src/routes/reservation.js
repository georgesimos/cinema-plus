const express = require('express')
const Reservation = require('../models/reservation')
const userModeling = require('../utils/userModeling')
const generateQR = require('../utils/generateQRCode')

const router = new express.Router()

// Create a reservation
router.post('/reservations', async (req, res) => {
    const reservation = new Reservation(req.body)

    const QRCode = await generateQR('https://elcinema.herokuapp.com/checkin/'+ reservation._id)
    
    try {
        await reservation.save()
        res.status(201).send({reservation, QRCode})
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all reservations
router.get('/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find({})
        res.send(reservations)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get reservation by id 
router.post('/reservations/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const reservation = await Reservation.findById(_id)
        !reservation ? res.sendStatus(404) : res.send(reservation)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Update reservation by id
router.patch('/reservations/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['date','startAt', 'seats', 'ticketPrice', 'total', 'username', 'phone']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const reservation = await Reservation.findById(_id)
        updates.forEach((update) => reservation[update] = req.body[update])
        await reservation.save()
        !reservation ? res.sendStatus(404) : res.send(reservation)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete reservation by id 
router.delete('/reservations/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const reservation = await Reservation.findByIdAndDelete(_id)
        !reservation ? res.sendStatus(404) : res.send(reservation)
    } catch (e) {
        res.sendStatus(400)
    }
})

// User modeling get suggested seats
router.get('/reservations/usermodeling/:username', async (req, res) => {
    const username = req.params.username
    try {
        const suggestedSeats = await userModeling.reservationSeatsUserModeling(username)
        res.send(suggestedSeats);
    } catch (e) {
      res.status(400).send(e);
    }
  })

module.exports = router