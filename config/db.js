const mongoose = require("mongoose");
require("dotenv").config();

// const MONGO_URI = process.env.MONGODB_URI;
// mongoose.connect(MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;

// db.on("connected", () => {
//   console.log("connected to MongoDB server");
// });
// db.on("error", (err) => {
//   console.log("MongoDB connection error:", err);
// });
// db.on("disconnected", () => {
//   console.log("MongoDB disconnected");
// });

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
        
    }catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // stop server if DB fails
        
    }
};

module.exports = connectDB;
