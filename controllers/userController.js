
const User = require('../models/userModel');

const addCoinToUser = async (req, res) => {
  try {
    const userId = req.user._id; 

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.coins += 1;
    await user.save();

    res.status(200).json({ message: 'Coin added', coins: user.coins });
  } catch (error) {
    res.status(500).json({ message: 'Error adding coin', error });
  }
};

module.exports = { addCoinToUser };
