const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    // During tests, connection handled by jest.setup.js
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDB;
