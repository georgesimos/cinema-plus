const mongoose = require('mongoose')

const userMetaSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: String,
        trim: true
    },
    website: {
        type: String,
        trim: true
    }

})

const UserMeta = mongoose.model('UserMeta', userMetaSchema)

module.exports = UserMeta