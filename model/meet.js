const mongoose = require('mongoose');

// Schéma pour un post-it
const postItSchema = mongoose.Schema({
  content: String,
  position: { x: Number, y: Number },
  selectedColor: String,
  createdAt: Date,
  updatedAt: Date,
  status: String,
  userId: String,
});

// Schéma pour une réunion
const meetSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  postIts: [postItSchema] // Liste de post-its
});

const Meet = mongoose.model('Meet', meetSchema);
module.exports = Meet;