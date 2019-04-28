const express = require('express')
require('./db/mongoose')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World'))

app.listen(port, () => console.log(`app is running in PORT: ${port}`))