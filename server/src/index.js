const express = require('express')
const path = require('path')
const multer = require('multer')

if (process.env.NODE_ENV !== 'production' ) { 
  require('dotenv').config({path: path.join(__dirname, '../.env')}) 
}
require('./db/mongoose')




const userRouter = require('./routes/users')
const movieRouter = require('./routes/movies')
const cinemaRouter = require('./routes/cinema')
const showtimeRouter = require('./routes/showtime')
const reservationRouter = require('./routes/reservation')
const invitationsRouter = require('./routes/invitations')

const storage = multer.diskStorage({
  // destination: path.join(__dirname + '../../client/build/'),
  destination: 'public/uploads',
  filename:  (req, file, cb) => {
    cb(null,`${Date.now()}-${file.originalname}`)
  }
})
 
const upload = multer({ storage: storage,  fileFilter: (req, file, cb) => {
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
  } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
} })

const app = express()
app.disable('x-powered-by');
const port = process.env.PORT || 3001

// Serve static files from the React app
app.use('/uploads', express.static('public'));
app.use(express.static(path.join(__dirname, '../../client/build')));

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
app.use(invitationsRouter)

app.post('/profile', upload.single('file'), (req,res, next) => {
  const url = req.protocol + '://' + req.get('host')
  console.log(url)
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
})



// app.get('/api/test', (req, res) => res.send('Hello World'))

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname + '../../client/build/index.html'));
  });
app.listen(port, () => console.log(`app is running in PORT: ${port}`))