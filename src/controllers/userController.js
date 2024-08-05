const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenBlacklist = require("../utils/tokenBlacklist");

const selectattributes = ["_id", "firstName", "lastName", "email"];

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid email and password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email and password" });
    }

    const payload = {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      data: payload,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const { _id } = req.user;

    console.log("user ====", req.user);

    if (!_id) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized: User ID not found" });
    }

    const user = await User.findOne({ _id }).select(selectattributes.join(" "));

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error in getUserProfile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};



const logoutUser = async (req, res) => {
  try {
    const authHeader = req.header("Authorization");
    const token = authHeader ? authHeader.replace("Bearer ", "") : null;

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }

    // Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "JsonWebTokenError") {
        return res
          .status(401)
          .json({ success: false, message: "Invalid token" });
      } else if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token expired" });
      }
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    // Blacklist the token or invalidate it
    await tokenBlacklist.add(token);

    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userId = req.user._id;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  // deleteUserProfile,
};
