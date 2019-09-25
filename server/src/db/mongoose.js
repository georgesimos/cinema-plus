const mongoose = require('mongoose')

mongoose.connect('mongodb://user:user123456@ds159112.mlab.com:59112/heroku_pcxv37mj', {
    useNewUrlParser: true,
    useCreateIndex: true
})

