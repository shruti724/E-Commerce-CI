const express = require("express");
const router = express.Router();
const couponController = require("../controller/couponController");
const authMiddleware = require("../middlewares/authMiddleware");
const paginationMiddleware = require("../middlewares/paginationMiddleware")

// Create a new coupon
router.post("/coupon", couponController.createCoupon);

// Get a list of coupons
router.get("/coupons", paginationMiddleware, couponController.getCoupons);

// Get coupon by ID
router.get("/coupons/:id", couponController.getCouponById);

// Update coupon information
router.put("/coupons/:id", couponController.updateCoupon);

// Delete a coupon
router.delete("/coupons/:id", couponController.deleteCoupon);

router.post("/coupons/apply", couponController.applyCoupon);
module.exports = router;
