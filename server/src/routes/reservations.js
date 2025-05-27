const express = require('express');
const auth = require('../middlewares/auth');
const Reservation = require('../models/reservation');

const router = new express.Router();

// Get all reservations
router.get('/reservations', auth.enhance, async (req, res) => {
  try {
    const reservations = await Reservation.find({});
    res.send(reservations);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete reservation by id
router.delete('/reservations/:id', auth.enhance, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).send({ error: 'Бронирование не найдено' });
    }
    
    // Проверяем, что пользователь удаляет свое бронирование
    if (reservation.username !== req.user.username) {
      return res.status(403).send({ error: 'Нет прав для удаления этого бронирования' });
    }

    await reservation.remove();
    res.send(reservation);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router; 