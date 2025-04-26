const mongoose = require("mongoose");

const captchaSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isSolved: { type: Boolean, default: false },
});

const Captcha = mongoose.model("Captcha", captchaSchema);
module.exports = Captcha;
