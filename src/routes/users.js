const express = require('express')
const User = require('../models/user')
const auth = require('../middlewares/auth')

const router = new express.Router()

// Create a user
router.post('/users', async (req, res) => {
    if (req.body.admin) return res.status(400).send({
        "error": "Only the god can create an admin!"
    });

    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// Login User
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

// Logout user
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(400).send(e)
    }
})

// Logout all
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()

    } catch (e) {
        res.status(400).send(e)
    }
})

// Get all users
router.get('/users', auth, async (req, res) => {
    if (!req.user.admin) return res.status(400).send({
        "error": "Only the god can see all the users!"
    });
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(400).send(e)
    }
})
// User infos
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

module.exports = router