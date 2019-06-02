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
    console.log(req.body)
    try {
        const user = await User.findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send({ error: { message: "You have entered an invalid username or password" } })
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

// Get user by id only for admin
router.get('/users/:id', auth, async (req, res) => {
    if (!req.user.admin) return res.status(400).send({
        "error": "Only the god can see the user!"
    });
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) return res.sendStatus(404)
        res.send(user)
    } catch (e) {
        res.sendStatus(400)
    }
})

// Edit/Update user 
router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstname', 'lastname', 'username', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const { user } = req
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Admin can update user by id
router.patch('/users/:id', auth, async (req, res) => {
    if (!req.user.admin) return res.status(400).send({
        "error": "Only the god can update the user!"
    });
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstname', 'lastname', 'username', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    try {
        const user = await User.findById(_id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        if (!user) return res.sendStatus(404)
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Delete by id
router.delete('/users/:id', auth, async (req, res) => {
    if (req.user.admin) return res.status(400).send({
        "error": "Only the god can delete the user!"
    });
    const _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) return res.sendStatus(404)

        res.send(user)
    } catch (e) {
        res.sendStatus(400)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    if (req.user.admin) return res.status(400).send({
        "error": "You cannot delete yourself!"
    });
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.sendStatus(400)
    }
})

module.exports = router