const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { checkParagraph } = require("../controllers/paragraphController");

router.post("/check-paragraph", authMiddleware, checkParagraph);

module.exports = router;
