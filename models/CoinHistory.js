// models/CoinHistory.js
import mongoose from "mongoose";

const coinHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  coinsEarned: {
    type: Number,
    required: true,
  },
  source: {
    type: String, // e.g., "watch_video"
    default: "watch_video",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CoinHistory", coinHistorySchema);
