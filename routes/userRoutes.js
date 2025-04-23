
const express = require('express');
const router = express.Router();
const { requireSignIn } = require('../middleware/authMiddleware');
const { addCoinToUser } = require('../controllers/userController');

router.post('/add-coin', requireSignIn, addCoinToUser);

module.exports = router;
