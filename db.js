const mongoose = require('mongoose');

const connectToDB = () => {

  const dbURI = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://Wistako:${process.env.DB_PASS}@cluster0.80soovx.mongodb.net/AdvertDB?retryWrites=true&w=majority&appName=Cluster0`
  : 'mongodb://localhost:27017/AdvetrDB';

  // connect to the database
  mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = mongoose.connection;

  // on succes
  db.once('open', () => {
    console.log('Connected to the database with URI ' + dbURI);
  });

  // on error
  db.on('error', (error) => {
    console.log('Error ' + error);
  });
}

module.exports = connectToDB;