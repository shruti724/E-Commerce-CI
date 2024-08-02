const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const {
      products, 
      tax,
      delivery_charge,
      shipment, 
      coupon, 
    } = req.body;
    const user_id = req.user.id;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let couponDiscount = 0;
    if (coupon) {
      const couponData = await Coupon.findById(coupon);
      if (!couponData) {
        return res.status(404).json({
          success: false,
          message: "Coupon not found",
        });
      }
      if (new Date(couponData.expirationDate) < new Date()) {
        return res.status(400).json({
          success: false,
          message: "Coupon has expired",
        });
      }
      // To calculate coupon discount based on type
      if (couponData.type === "flat") {
        couponDiscount = couponData.discount;
      } else if (couponData.type === "percentage") {
        // To calculate the total amount for the products
        let totalProductAmount = 0;
        for (const item of products) {
          const product = await Product.findById(item.product);
          if (!product) {
            return res.status(404).json({
              success: false,
              message: `Product not found`,
            });
          }
          totalProductAmount += product.discounted_price * item.quantity;
        }
        couponDiscount = (totalProductAmount * couponData.discount) / 100;
      }
    }

    // To calculate the total amount
    let totalAmount = 0;
    let discountPrice = 0;
    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found`,
        });
      }
      totalAmount += product.discounted_price * item.quantity;
      discountPrice +=
        (product.price - product.discounted_price) * item.quantity;
    }

    // Apply coupon discount
    const grandTotal = totalAmount + tax - couponDiscount + delivery_charge;

    const order = new Order({
      user: user_id,
      products,
      total_Amount: totalAmount,
      grand_total: grandTotal,
      tax,
      discount_price: discountPrice,
      coupon_applied: couponDiscount,
      delivery_charge,
      shipment,
      coupon,
    });

    await order.save();

    res.status(201).json({
      success: true,
      data: order,
      message: "Order created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating order",
      error: error.message,
    });
  }
};

// Get a list of orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.product")
      .populate("coupon");

    res.status(200).json({
      success: true,
      data: orders,
      message: "Orders fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching orders",
      error: error.message,
    });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("products.product")
      .populate("coupon");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
      message: "Order fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching order",
      error: error.message,
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user; 

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (user.role === "admin" || user.isAdmin) {
      order.status = status || order.status;
    } else {
      if (status === "cancelled") {
        order.status = "cancelled";
      } else {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to perform this action",
        });
      }
    }

    await order.save();

    res.status(200).json({
      success: true,
      data: order,
      message: "Order status updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating order status",
      error: error.message,
    });
  }
};


const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
