const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Authorization Header: ", req.headers.authorization);  // Debugging line

  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request
    next();
  } catch (err) {
    console.error("JWT Verification Error: ", err);  // More detailed error logging
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};



module.exports = authMiddleware;
