const express = require("express");
const router = express.Router();
const coinController = require("../controllers/coinController");
const authMiddleware = require("../middleware/authMiddleware");


// ✅ Coin APIs (JWT Required)
router.post("/earn", authMiddleware, coinController.earnCoin);         // 60 sec watch → 1 coin
router.get("/total", authMiddleware, coinController.getTotalCoins);    // Get user's coins
router.post("/redeem", authMiddleware, coinController.redeemCoin);     // 100 coins → ₹1

router.get("/math-questions", authMiddleware, coinController.getMathQuestions);  // Get 3 Random Questions
router.post("/submit-math", authMiddleware, coinController.submitMathAnswers);  // Submit Answers and Reward Coins


module.exports = router;
