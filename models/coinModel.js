// models/coinModel.js
const mongoose = require('mongoose');

const coinSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coins: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coin', coinSchema);
