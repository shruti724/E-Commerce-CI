const express = require("express");
const router = express.Router();
const {
  createAddress,
  addANewAddress,
  getUserWithAddresses,
  deleteAddress,
} = require("../controller/addressController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/address", createAddress);
router.get("/addresses", getUserWithAddresses);
router.post("/address/other", addANewAddress);
router.delete("/address/:id", deleteAddress);
module.exports = router;
 
