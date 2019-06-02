const express = require('express')
require('./db/mongoose')

const userRouter = require('./routes/users')
const movieRouter = require('./routes/movies')
const cinemaRouter = require('./routes/cinema')
const showtimeRouter = require('./routes/showtime')
const reservationRouter = require('./routes/reservation')

const app = express()
app.disable('x-powered-by');
const port = process.env.PORT || 3001

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

    //  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // Pass to next layer of middleware
    next();
});
app.use(express.json())
app.use(userRouter)
app.use(movieRouter)
app.use(cinemaRouter)
app.use(showtimeRouter)
app.use(reservationRouter)

app.get('/', (req, res) => res.send('Hello World'))


app.listen(port, () => console.log(`app is running in PORT: ${port}`))