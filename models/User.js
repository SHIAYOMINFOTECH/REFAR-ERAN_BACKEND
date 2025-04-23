const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, unique: true }, 
  coins: { type: Number, default: 0 },
  rupees: {
    type: Number,
    default: 0,
  },
  earnHistory: [
    {
      videoId: String, 
      durationWatched: Number, 
      coinsEarned: Number,
      watchedAt: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
