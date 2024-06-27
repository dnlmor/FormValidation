const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  favoriteNumber: { type: Number, required: true },
  favoriteMammal: { type: String, enum: ['Dog', 'Cat', 'Horse', 'Elephant', 'Cow'], required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Profile', profileSchema);
