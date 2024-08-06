const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongo_Url =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URL_REMOTE
        : process.env.MONGO_URL_LOCAL;

    // Remove deprecated options
    await mongoose.connect(mongo_Url);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
