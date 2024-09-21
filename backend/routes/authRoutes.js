const express = require("express");
const {
  resetPassword,
  updatePassword,
} = require("../controller/authController");

const router = express.Router();

// Route to request a password reset link
router.post("/reset/password", resetPassword);

// Route to update the password using the reset token
router.post("/new/password", updatePassword);

module.exports = router;
