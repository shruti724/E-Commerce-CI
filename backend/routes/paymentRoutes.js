const express = require("express");
const router = express.Router();
const {
  processPayment,
  getPaymentDetails,
} = require("../controller/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/payment",  processPayment);
router.get("/payment/:id", getPaymentDetails);

module.exports = router;
