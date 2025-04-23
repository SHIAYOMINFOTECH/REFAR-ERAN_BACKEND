const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useCreateIndex: true, // optional: enables the creation of indexes
      useFindAndModify: false, // optional: to avoid deprecation warnings for findAndModify
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
