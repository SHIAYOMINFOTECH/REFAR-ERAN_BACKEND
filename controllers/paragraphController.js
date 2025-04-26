const jwt = require('jsonwebtoken');
const spellChecker = require('spellchecker');
const User = require('../models/User');

// ✅ 100-word reference paragraph
const referenceParagraph = `The internet has transformed how we live, work, and communicate. It connects people from around the world in real time, enabling collaboration, learning, and sharing of ideas. Social media platforms help individuals express themselves, while e-commerce sites make shopping more convenient. Online education offers access to quality resources for anyone with a connection. However, with these benefits come responsibilities. Users must be aware of privacy risks, cyberbullying, and misinformation. It is essential to promote digital literacy and ethical behavior online. Governments, schools, and tech companies must work together to ensure the internet remains a safe and empowering space for everyone The internet has transformed how we live, work, and communicate. It connects people from around the world in real time, enabling collaboration, learning, and sharing of ideas. Social media platforms help individuals express themselves, while e-commerce sites make shopping more convenient. Online education offers access to quality resources for anyone with a connection. However, with these benefits come responsibilities. Users must be aware of privacy risks, cyberbullying, and misinformation. It is essential to promote digital literacy and ethical behavior online. Governments, schools, and tech companies must work together to ensure the internet remains a safe and empowering space for everyone The internet has transformed how we live, work, and communicate. It connects people from around the world in real time, enabling collaboration, learning, and sharing of ideas. Social media platforms help individuals express themselves, while e-commerce sites make shopping more convenient. Online education offers access to quality resources for anyone with a connection. However, with these benefits come responsibilities. Users must be aware of privacy risks, cyberbullying, and misinformation. It is essential to promote digital literacy and ethical behavior online. Governments, schools, and tech companies must work together to ensure the internet remains a safe and empowering space for everyone.`;

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

exports.checkParagraph = async (req, res) => {
  const { paragraph } = req.body;

  // Get token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(400).json({ success: false, message: 'Token is required.' });
  }

  // Decode and verify token
  const decoded = verifyToken(token);
  if (!decoded || !decoded._id) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }

  // Check if paragraph is provided
  if (!paragraph) {
    return res.status(400).json({ success: false, message: 'Paragraph is required.' });
  }

  // Check spelling
  const misspelled = spellChecker.checkSpelling(paragraph);
  if (misspelled.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Spelling mistakes found! Please correct them to earn coins.',
    });
  }

  // Clean and normalize paragraphs
  const cleanedUserPara = paragraph.trim().replace(/\s+/g, ' ');
  const cleanedReferencePara = referenceParagraph.trim().replace(/\s+/g, ' ');

  // Word count (accurate)
  const wordCount = cleanedUserPara.match(/\b\w+\b/g)?.length || 0;

  // Paragraph match check
  if (cleanedUserPara !== cleanedReferencePara) {
    return res.status(400).json({
      success: false,
      message: 'Paragraph does not match the required reference paragraph.',
    });
  }

  // Word count minimum check
  if (wordCount < 100) {
    return res.status(400).json({
      success: false,
      message: `Paragraph is correct but only ${wordCount} words. Minimum 100 words required to earn coins.`,
    });
  }

  // Reward coins
  try {
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    user.coins += 2;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Paragraph is correct! You earned 2 coins.',
      coins: user.coins,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};
