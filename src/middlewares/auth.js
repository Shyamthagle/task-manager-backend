const jwt = require("jsonwebtoken");
const User = require("../models/user");
const tokenBlacklist = require('../utils/tokenBlacklist'); // Adjust path if needed

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");

    if (tokenBlacklist.isBlacklisted(token)) {
      return res.status(401).json({ success: false, message: "Token has been invalidated" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ success: false, message: "Authentication failed" });
  }
};

module.exports = auth;
