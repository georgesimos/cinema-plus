const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../utils/multer');
const Cinema = require('../models/cinema');
const userModeling = require('../utils/userModeling');

const router = new express.Router();

// Create a cinema
router.post('/cinemas', auth.enhance, async (req, res) => {
  try {
    // Проверяем существование кинотеатра с таким названием
    const existingCinema = await Cinema.findOne({ name: req.body.name });
    if (existingCinema) {
      return res.status(400).send({ 
        error: 'Кинотеатр с таким названием уже существует' 
      });
    }

  const cinema = new Cinema(req.body);
    await cinema.save();
    res.status(201).send(cinema);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post('/cinemas/photo/:id', upload('cinemas').single('file'), async (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}`;
  const { file } = req;
  const movieId = req.params.id;
  try {
    if (!file) {
      const error = new Error('Please upload a file');
      error.httpStatusCode = 400;
      return next(error);
    }
    const cinema = await Cinema.findById(movieId);
    if (!cinema) return res.sendStatus(404);
    cinema.image = `${url}/${file.path}`;
    await cinema.save();
    res.send({ cinema, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
});

// Get all cinemas
router.get('/cinemas', async (req, res) => {
  try {
    const cinemas = await Cinema.find({});
    res.send(cinemas);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Get cinema by id
router.get('/cinemas/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const cinema = await Cinema.findById(_id);
    if (!cinema) return res.sendStatus(404);
    return res.send(cinema);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Update cinema by id
router.patch('/cinemas/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'ticketPrice', 'seats', 'seatsAvailable', 'seatTypes'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' });

  try {
    // Если обновляется название, проверяем его уникальность
    if (updates.includes('name')) {
      const existingCinema = await Cinema.findOne({ 
        name: req.body.name,
        _id: { $ne: _id } // Исключаем текущий кинотеатр из проверки
      });
      if (existingCinema) {
        return res.status(400).send({ 
          error: 'Кинотеатр с таким названием уже существует' 
        });
      }
    }

    const cinema = await Cinema.findById(_id);
    if (!cinema) return res.sendStatus(404);
    
    updates.forEach((update) => (cinema[update] = req.body[update]));
    await cinema.save();
    return res.send(cinema);
  } catch (e) {
    return res.status(400).send(e);
  }
});

// Delete cinema by id
router.delete('/cinemas/:id', auth.enhance, async (req, res) => {
  const _id = req.params.id;
  try {
    const cinema = await Cinema.findByIdAndDelete(_id);
    if (!cinema) return res.sendStatus(404);
    return res.send(cinema);
  } catch (e) {
    return res.sendStatus(400);
  }
});

// Cinema User modeling (GET ALL CINEMAS)
router.get('/cinemas/usermodeling/:username', async (req, res) => {
  const { username } = req.params;
  try {
    console.log('Getting cinemas for user:', username);
    const cinemas = await Cinema.find({});
    if (!cinemas) {
      return res.status(404).send({ error: 'Кинотеатры не найдены' });
    }
    // Если нет моделирования, просто возвращаем все кинотеатры
    const cinemasUserModeled = await userModeling.cinemaUserModeling(cinemas, username);
    console.log('Returning cinemas:', cinemasUserModeled);
    res.send(cinemasUserModeled);
  } catch (e) {
    console.error('Error in cinema user modeling:', e);
    res.status(400).send({ error: 'Ошибка при получении кинотеатров' });
  }
});

module.exports = router;
