// routes/coin.js
import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import CoinHistory from "../models/CoinHistory.js";

const router = express.Router();

// GET total coins earned by user
router.get("/total", requireSignIn, async (req, res) => {
  try {
    const result = await CoinHistory.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: null,
          totalCoins: { $sum: "$coinsEarned" },
        },
      },
    ]);

    const totalCoins = result.length > 0 ? result[0].totalCoins : 0;

    res.status(200).json({
      success: true,
      totalCoins,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
