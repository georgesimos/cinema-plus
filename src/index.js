const express = require('express')
require('./db/mongoose')

const userRouter = require('./routes/users')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)

app.get('/', (req, res) => res.send('Hello World'))


app.listen(port, () => console.log(`app is running in PORT: ${port}`))