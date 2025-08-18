// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // MongoDB connection string from environment variables
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Stop the app if DB fails
  }
};

module.exports = connectDB;
