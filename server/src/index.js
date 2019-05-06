const express = require('express')
require('./db/mongoose')

const userRouter = require('./routes/users')
const movieRouter = require('./routes/movies')

const app = express()
app.disable('x-powered-by');
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(movieRouter)

app.get('/', (req, res) => res.send('Hello World'))


app.listen(port, () => console.log(`app is running in PORT: ${port}`))