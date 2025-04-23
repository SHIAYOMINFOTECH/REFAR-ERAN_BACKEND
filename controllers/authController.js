const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const generateReferralCode = require("../utils/generateReferralCode"); 

// ✅ Register
const register = async (req, res) => {
  const { firstName, lastName, mobile, email, password } = req.body;

  if (!firstName || !lastName || !mobile || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ mobile }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const referralCode = generateReferralCode(firstName);

    const newUser = new User({
      firstName,
      lastName,
      mobile,
      email,
      password: hashedPassword,
      referralCode,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        mobile: newUser.mobile,
        email: newUser.email,
        referralCode: newUser.referralCode,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Login
const login = async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile) {
    return res.status(400).json({ error: "Mobile number is required" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const user = await User.findOne({ mobile });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Get Profile (NEW FUNCTION)
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        mobile: user.mobile,
        referralCode: user.referralCode,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update Profile
const updateProfile = async (req, res) => {
  const { userId } = req.user;
  const { firstName, lastName, mobile, email } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (mobile) user.mobile = mobile;
    if (email) user.email = email;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
