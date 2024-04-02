const mongoose = require('mongoose');

const connectToDB = () => {

  // connect to the database
  mongoose.connect('mongodb://localhost:27017/AdvertDB', { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  // on succes
  db.once('open', () => {
    console.log('Connected to the database');
  });

  // on error
  db.on('error', (error) => {
    console.log('Error ' + error);
  });
}

module.exports = connectToDB;