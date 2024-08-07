const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require('dotenv').config(); // Ensure dotenv is loaded

// Load configuration
const configPath = path.join(__dirname, "config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const connectDB = async () => {
  try {
    const env = process.env.NODE_ENV || "development"; // Default to development if NODE_ENV is not set
    const mongoUrl = config[env].url;

    if (!mongoUrl) {
      throw new Error("MongoDB connection string is not defined in the configuration.");
    }

    await mongoose.connect(mongoUrl, {
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
