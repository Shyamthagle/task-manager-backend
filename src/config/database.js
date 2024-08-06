const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongo_Url =
      process.env.NODE_ENV === "production"
        ? process.env.MONGO_URL_REMOTE
        : process.env.MONGO_URL_LOCAL;

    await mongoose.connect(mongo_Url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit the process with a failure code
  }
};

module.exports = connectDB;
