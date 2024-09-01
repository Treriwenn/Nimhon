const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  addresse: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  coordinate: { // Assurez-vous que ce champ est défini
    lat: { type: Number, required: true },
    lon: { type: Number, required: true }
  },
});

module.exports = mongoose.model('Property', propertySchema);
