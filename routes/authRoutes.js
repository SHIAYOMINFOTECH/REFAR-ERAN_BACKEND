const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');  // Check path
const authController = require('../controllers/authController');  // Correct import for controller

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes (need JWT token)
router.get("/profile", authMiddleware, authController.getProfile);
router.put("/profile", authMiddleware, authController.updateProfile);

module.exports = router;
