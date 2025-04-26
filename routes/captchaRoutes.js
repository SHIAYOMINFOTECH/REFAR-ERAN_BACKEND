const express = require("express");
const router = express.Router();
const captchaController = require("../controllers/captchaController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/verify", authMiddleware, captchaController.verifyCaptcha);

module.exports = router;
