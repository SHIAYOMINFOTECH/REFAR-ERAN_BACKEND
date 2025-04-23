// routes/videoRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { completeVideo } = require("../controllers/videoController");

router.post("/complete", authMiddleware, completeVideo);

module.exports = router;
