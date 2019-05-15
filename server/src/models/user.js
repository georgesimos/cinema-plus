const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const Schema = mongoose.Schema;
const userSchema = Schema({
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
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password should not contain word: password')
            }

        }
    },
    admin: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
        timestamps: true
    })

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    if (!userObject.admin) {
        delete userObject.admin
        delete userObject._id
        delete userObject.createdAt
        delete userObject.updatedAt
        delete userObject.__v
    }
    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'mySecret')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (username, password) => {

    const user = await User.findOne({ username })
    if (!user) throw new Error('Unable to login')

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Unable to login')

    return user
}

// Hash the plain text password before save
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User