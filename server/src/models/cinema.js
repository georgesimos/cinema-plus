const mongoose = require('mongoose');

const { Schema } = mongoose;

const seatSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  coefficient: {
    type: Number,
    required: true,
    default: 1.0
  }
});

const cinemaSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  seats: {
    type: [[seatSchema]],
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  }
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;
