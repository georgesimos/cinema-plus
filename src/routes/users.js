const express = require('express')
const User = require('../models/user')
const UserMeta = require('../models/userMeta')
const Address = require('../models/address')

const router = new express.Router()

//Create a user
router.post('/users', async (req, res) => {
    const user = new User(req.body)
    const address = new Address(req.body)
    const userMeta = new UserMeta(req.body)
    user.address = address._id
    user.meta = userMeta._id
    try {
        await user.save()
        await address.save()
        await userMeta.save()
        res.status(201).send({ user, userMeta, address })
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router