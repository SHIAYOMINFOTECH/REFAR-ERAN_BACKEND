// controllers/videoController.js
const User = require("../models/User");

const completeVideo = async (req, res) => {
  const { startTime, endTime } = req.body;
  const { userId } = req.user; // JWT authMiddleware thi aave che

  try {
    const duration = (new Date(endTime) - new Date(startTime)) / 1000; // seconds ma

    if (duration >= 60) {
      const user = await User.findById(userId);
      user.coins += 1; // Add 1 coin
      await user.save();

      return res.status(200).json({ message: "1 coin added", coins: user.coins });
    } else {
      return res.status(200).json({ message: "Watch full 60 seconds to earn coin" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = { completeVideo };
