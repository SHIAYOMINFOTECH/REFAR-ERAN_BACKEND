const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Remove deprecated options
    await mongoose.connect(process.env.MONGO_URI, {
      // No need to use 'useCreateIndex' and 'useFindAndModify' anymore
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
