const Coin = require("../models/coinModel");
const User = require("../models/User");
const MathQuestion = require("../models/MathQuestion");
// ✅ 1. Earn Coin API
exports.earnCoin = async (req, res) => {
    try {
      const userId = req.user.userId;
      const { watchedSeconds } = req.body;
  
      if (!watchedSeconds || watchedSeconds < 60) {
        return res.status(400).json({
          success: false,
          message: "Minimum 60 seconds required to earn a coin",
        });
      }
  
      const coinsToAdd = Math.floor(watchedSeconds / 60); // 💡 Count how many full 60s are present
  
      let userCoins = await Coin.findOne({ user: userId });
      if (!userCoins) {
        userCoins = new Coin({ user: userId, coins: 0 });
      }
  
      userCoins.coins += coinsToAdd;
      await userCoins.save();
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      user.coins += coinsToAdd;
  
      // 💸 Convert every 100 coins into 1 rupee
      while (user.coins >= 100) {
        user.coins -= 100;
        user.rupees += 1;
      }
  
      await user.save();
  
      res.status(200).json({
        success: true,
        coins: user.coins,
        rupees: user.rupees,
        message: `${coinsToAdd} coin(s) earned successfully`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Error while earning coin",
        error: error.message,
      });
    }
  };
  

// ✅ 2. Get Total Coins API
exports.getTotalCoins = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;

    const userCoins = await Coin.findOne({ user: userId });
    res.status(200).json({
      success: true,
      totalCoins: userCoins?.coins || 0,
      message: "Total coins fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching coins",
      error: error.message,
    });
  }
};

// ✅ 3. Redeem Coin API
exports.redeemCoin = async (req, res) => {
  try {
    const userId = req.user.userId || req.user._id;

    const userCoins = await Coin.findOne({ user: userId });
    const user = await User.findById(userId);

    if (!userCoins || userCoins.coins < 100) {
      return res.status(400).json({
        success: false,
        message: "You need at least 100 coins to redeem ₹1",
      });
    }

    userCoins.coins -= 100;
    await userCoins.save();

    user.rupees += 1;
    await user.save();

    res.status(200).json({
      success: true,
      message: "₹1 redeemed successfully",
      remainingCoins: userCoins.coins,
      totalRupees: user.rupees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while redeeming coin",
      error: error.message,
    });
  }
};





// Generate 3 random math questions
exports.getMathQuestions = async (req, res) => {
  try {
    // 3 Random Questions from Database
    const questions = await MathQuestion.aggregate([{ $sample: { size: 3 } }]);
    res.status(200).json({ success: true, questions });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Submit answers from user
exports.submitMathAnswers = async (req, res) => {
  try {
    const userId = req.user._id;
    const { userAnswers } = req.body;

    let correctCount = 0;

    for (let item of userAnswers) {
      const questionDoc = await MathQuestion.findOne({ question: item.question });
      if (questionDoc && questionDoc.answer === item.userAnswer) {
        correctCount++;
      }
    }

    if (correctCount === 3) {
      const user = await User.findById(userId);
      user.coins += 100;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Correct! 100 coins added."
      });
    } else {
      return res.status(200).json({
        success: false,
        message: `${correctCount}/3 correct. Try again.`
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};



