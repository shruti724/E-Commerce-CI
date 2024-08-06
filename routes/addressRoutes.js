const express = require("express");
const router = express.Router();
const {
  createAddress,
  addANewAddress,
  getUserWithAddresses,
  deleteAddress,
} = require("../controller/addressController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/address", authMiddleware, createAddress);
router.get("/addresses", authMiddleware, getUserWithAddresses);
router.post("/address/other", authMiddleware, addANewAddress);
router.delete("/address/:id", authMiddleware, deleteAddress);
module.exports = router;
