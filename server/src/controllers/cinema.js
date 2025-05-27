const Cinema = require('../models/cinema');
const { uploadToCloudinary } = require('../utils/cloudinary');

exports.createCinema = async (req, res) => {
  try {
    console.log('Creating cinema with data:', req.body);
    const { name, ticketPrice, seatsAvailable, seats } = req.body;
    
    // Проверяем уникальность названия
    const existingCinema = await Cinema.findOne({ name });
    if (existingCinema) {
      return res.status(400).json({
        status: 'error',
        message: 'Кинотеатр с таким названием уже существует'
      });
    }

    // Создаем новый кинотеатр
    const cinema = new Cinema({
      name,
      ticketPrice,
      seatsAvailable,
      seats,
      seatTypes: {} // Инициализируем пустой объект для типов мест
    });

    // Если есть файл изображения, загружаем его
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path);
      cinema.image = result.secure_url;
    }

    const savedCinema = await cinema.save();
    console.log('Saved cinema:', savedCinema);

    res.status(201).json({
      status: 'success',
      data: savedCinema
    });
  } catch (error) {
    console.error('Error creating cinema:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Ошибка при создании кинотеатра'
    });
  }
};

exports.updateCinema = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ticketPrice, seatsAvailable, seats, seatTypes } = req.body;
    
    // Проверяем существование кинотеатра
    const cinema = await Cinema.findById(id);
    if (!cinema) {
      return res.status(404).json({
        status: 'error',
        message: 'Кинотеатр не найден'
      });
    }

    // Проверяем уникальность названия
    const existingCinema = await Cinema.findOne({ name, _id: { $ne: id } });
    if (existingCinema) {
      return res.status(400).json({
        status: 'error',
        message: 'Кинотеатр с таким названием уже существует'
      });
    }

    // Обновляем данные кинотеатра
    const updateData = {
      name,
      ticketPrice,
      seatsAvailable,
      seats
    };

    // Если переданы типы мест, добавляем их в обновление
    if (seatTypes) {
      updateData.seatTypes = seatTypes;
    }

    // Если есть файл изображения, обновляем его
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path);
      updateData.image = result.secure_url;
    }

    const updatedCinema = await Cinema.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: updatedCinema
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
}; 