const express = require('express')
const upload = require('../utils/multer')
const Cinema = require('../models/cinema')

const router = new express.Router()

// Create a cinema
router.post('/cinemas', async (req, res) => {
    const cinema = new Cinema(req.body)
    try {
        await cinema.save()
        res.status(201).send(cinema)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/cinemas/photo/:id', upload('cinemas').single('file'), async (req,res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const file = req.file
    const movieId = req.params.id
    try {
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      const cinema = await Cinema.findById(movieId);
      if (!cinema) return res.sendStatus(404);
      cinema['image'] = url + '/' + file.path
      await cinema.save();
      res.send({cinema, file});
    } catch (e) {
      console.log(e)
      res.sendStatus(400).send(e);
    }
  })

// Get all cinemas
router.get('/cinemas', async (req, res) => {
    try {
        const cinemas = await Cinema.find({})
        res.send(cinemas)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Get cinema by id 
router.get('/cinemas/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const cinema = await Cinema.findById(_id)
        !cinema ? res.sendStatus(404) : res.send(cinema)
    } catch (e) {
        res.status(400).send(e)
    }
})


// Update cinema by id
router.patch('/cinemas/:id', async (req, res) => {
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
router.delete('/cinemas/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const cinema = await Cinema.findByIdAndDelete(_id)
        !cinema ? res.sendStatus(404) : res.send(cinema)
    } catch (e) {
        res.sendStatus(400)
    }
})

module.exports = router