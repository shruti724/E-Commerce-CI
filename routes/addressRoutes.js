const express = require("express");
const router = express.Router();
const {
  createAddress,
  getUserWithAddresses,
} = require("../controller/addressController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/addresses", authMiddleware, createAddress);
router.get("/addresses", authMiddleware, getUserWithAddresses);

module.exports = router;
