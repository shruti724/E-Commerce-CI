const express = require("express");
const router = express.Router();
const {
  processPayment,
  getPaymentDetails,
} = require("../controller/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/payment", authMiddleware, processPayment);
router.get("/payment/:id", authMiddleware, getPaymentDetails);

module.exports = router;
