const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");
const errorMiddleware = require("./middlewares/errorMiddleware");

// Load environment variables
require("dotenv").config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "13.201.88.151", // Allow frontend origin
  })
);
app.use(express.json());

// Routes
app.use("/user", userRoute);
app.use("/task", taskRoute);

// Error handling middleware
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    // Set the port based on the environment
    const PORT = process.env.NODE_ENV === "production" ? 8000 : 3456;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

module.exports = app;
