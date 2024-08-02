const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");

// Create a new coupon
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      coupon_detail,
      coupon_min_checkout,
      start_date,
      discount,
      type,
      expirationDate,
      isActive,
    } = req.body;

    const newCoupon = new Coupon({
      code,
      coupon_detail,
      coupon_min_checkout,
      start_date,
      discount,
      type,
      expirationDate,
      isActive,
    });

    await newCoupon.save();

    res.status(201).json({
      success: true,
      data: newCoupon,
      message: "Coupon created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating coupon",
      error: error.message,
    });
  }
};

// Get a list of coupons
const getCoupons = async (req, res) => {
  try {
    const { page, limit, skip } = req.pagination;

    const coupons = await Coupon.find().skip(skip).limit(limit);

    res.status(200).json({
      success: true,
      data: coupons,

    });
  } catch (error) {
    console.error("Error fetching Coupons:", error);
    res
      .status(400)
      .json({ success: false, message: "Error fetching Coupons" });
  }
};

// Get coupon by ID
const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      data: coupon,
      message: "Coupon fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching coupon",
      error: error.message,
    });
  }
};

// Update coupon information
const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      code,
      coupon_detail,
      coupon_min_checkout,
      start_date,
      discount,
      type,
      expirationDate,
      isActive,
    } = req.body;

    const coupon = await Coupon.findById(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    coupon.code = code || coupon.code;
    coupon.coupon_detail = coupon_detail || coupon.coupon_detail;
    coupon.coupon_min_checkout =
      coupon_min_checkout || coupon.coupon_min_checkout;
    coupon.start_date = start_date || coupon.start_date;
    coupon.discount = discount || coupon.discount;
    coupon.type = type || coupon.type;
    coupon.expirationDate = expirationDate || coupon.expirationDate;
    coupon.isActive = isActive !== undefined ? isActive : coupon.isActive;

    await coupon.save();

    res.status(200).json({
      success: true,
      data: coupon,
      message: "Coupon updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating coupon",
      error: error.message,
    });
  }
};

// Delete a coupon
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findByIdAndDelete(id);

    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting coupon",
      error: error.message,
    });
  }
};

// Apply coupon to an order
const applyCoupon = async (req, res) => {
  try {
    const { order_id, coupon_code } = req.body;

    const coupon = await Coupon.findOne({ code: coupon_code });
    if (!coupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (new Date(coupon.expirationDate) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Coupon has expired",
      });
    }

    // Calculate discount and new total
    let discountAmount;
    if (coupon.type === "percentage") {
      discountAmount = (order.totalAmount * coupon.discount) / 100;
    } else {
      discountAmount = coupon.discount;
    }

    const newTotal = order.totalAmount - discountAmount;

    order.discount = discountAmount;
    order.totalAmount = newTotal;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      order_id: order._id,
      discount: discountAmount,
      new_total: newTotal,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error applying coupon",
      error: error.message,
    });
  }
};

module.exports = {
  createCoupon,
  getCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon,
};
