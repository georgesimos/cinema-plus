const mongoose = require('mongoose');

async function start() {
    try {
      await await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      });
      console.log('Connected to database');
    }
    catch (err) {
      console.log('Database connection ' + err);
    }
}

start();
