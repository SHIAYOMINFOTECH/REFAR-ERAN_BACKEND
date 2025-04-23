const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const cors = require('cors');
const videoRoutes = require("./routes/videoRoutes");
const coinRoutes = require("./routes/coinRoutes");

// dotenv config
dotenv.config();

// db call
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json()); // VERY IMPORTANT

// Add route for root URL
app.get("/", (req, res) => {
  res.send("Backend is live!");
});

// route
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/video", videoRoutes);
app.use("/api/v1/coin", coinRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server chalu che PORT ${PORT} par`);
});
