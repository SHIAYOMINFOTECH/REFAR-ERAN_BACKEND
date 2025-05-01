const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v); // ✅ Must be exactly 10 digits
      },
      message: props => `${props.value} is not a valid 10-digit mobile number!`
    }
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^[\w\-\.]+@gmail\.com$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  
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
