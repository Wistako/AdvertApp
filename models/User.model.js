const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  login: { type: String, required: true},
  password: { type: String, required: true },
  phone: { type: String, required: true, minLength: 9, maxLength: 9 },
  avatar: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);