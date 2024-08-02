const express = require("express");
const router = express.Router();
const couponController = require("../controller/couponController");
const authMiddleware = require("../middlewares/authMiddleware");
const paginationMiddleware = require("../middlewares/paginationMiddleware")

// Create a new coupon
router.post("/coupon", authMiddleware,couponController.createCoupon);

// Get a list of coupons
router.get("/coupons", authMiddleware, paginationMiddleware, couponController.getCoupons);

// Get coupon by ID
router.get("/coupons/:id", authMiddleware, couponController.getCouponById);

// Update coupon information
router.put("/coupons/:id", authMiddleware, couponController.updateCoupon);

// Delete a coupon
router.delete("/coupons/:id", authMiddleware, couponController.deleteCoupon);

router.post("/coupons/apply", authMiddleware, couponController.applyCoupon);
module.exports = router;
