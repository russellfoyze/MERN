// (In your Express.js server file)
const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  updatedAt: { type: Date, default: Date.now },
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero; // Export the model so you can use it in your routes