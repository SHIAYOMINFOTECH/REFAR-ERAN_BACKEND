const mongoose = require('mongoose');

// Define schema for Math Questions
const mathQuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('MathQuestion', mathQuestionSchema);
