const mongoose = require('mongoose');

const AdvertSchema = new mongoose.Schema({
  title: { type: String, required: true, minLength: 10, maxLength: 50 },
  content: { type: String, required: true, minLength: 20, maxLength: 1000 },
  date: { type: Date, default: Date.now },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  location: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Advert', AdvertSchema);