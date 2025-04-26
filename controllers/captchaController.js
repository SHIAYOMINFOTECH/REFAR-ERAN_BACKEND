const axios = require("axios");
const Coin = require("../models/coinModel");
const User = require("../models/User");

exports.verifyCaptcha = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ success: false, message: "CAPTCHA token missing" });
    }

    // Verify with Google
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
    );

    if (!response.data.success) {
      return res.status(400).json({ success: false, message: "CAPTCHA verification failed" });
    }

    // Reward coins
    let userCoins = await Coin.findOne({ user: userId });
    if (!userCoins) {
      userCoins = new Coin({ user: userId, coins: 0 });
    }

    userCoins.coins += 20;
    await userCoins.save();

    const user = await User.findById(userId);
    user.coins += 20;

    // Convert every 100 coins into ₹1
    while (user.coins >= 100) {
      user.coins -= 100;
      user.rupees += 1;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "CAPTCHA verified and 20 coins rewarded",
      coins: user.coins,
      rupees: user.rupees,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
