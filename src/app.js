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
app.use(cors());
app.use(express.json());
app.use(errorMiddleware);

// Routes
app.use("/user", userRoute);
app.use("/task", taskRoute);

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");

    app.get("/", (req, res) => {
      res.send("Hello, World!");
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1); // Exit the process with a failure code
  }
};

startServer();

module.exports = app;
