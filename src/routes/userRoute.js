const express = require("express");
const {
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  registerUser,
} = require("../controllers/userController");
const auth = require("../middlewares/auth");

const router = express.Router();

// Define routes
router.post("/create", registerUser);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);
router.get("/profile", auth, getUserProfile);
router.put("/profile", auth, updateUserProfile);

module.exports = router;
