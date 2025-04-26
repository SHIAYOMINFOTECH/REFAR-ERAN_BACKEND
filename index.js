const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const cors = require('cors');
const videoRoutes = require("./routes/videoRoutes");
const coinRoutes = require("./routes/coinRoutes");
const paragraphRoutes = require("./routes/paragraphRoutes");
const captchaRoutes = require("./routes/captchaRoutes");

// dotenv config
dotenv.config();

// db call
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json()); // VERY IMPORTANT

// route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/video", videoRoutes);
app.use("/api/v1/coin", coinRoutes);
app.use("/api/v1/paragraph", paragraphRoutes);
app.use("/api/v1/captcha", captchaRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server chalu che PORT ${PORT} par`);
});
