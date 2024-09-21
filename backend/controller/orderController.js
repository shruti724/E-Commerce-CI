const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Coupon = require("../models/couponModel");
const Payment = require("../models/paymentModel");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { products, tax, delivery_charge, shipment, coupon, payment } =
      req.body;
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

    // To calculate the total amount and validate stock
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

      // Validate product quantity
      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product ${product.title}`,
        });
      }

      totalAmount += product.discounted_price * item.quantity;
      discountPrice +=
        (product.price - product.discounted_price) * item.quantity;

      // Update product quantity
      product.quantity -= item.quantity;
      await product.save();
    }

    // Apply coupon discount
    const grandTotal = totalAmount + tax - couponDiscount + delivery_charge;

    // Create new order
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

    // If payment info is provided, create a payment and link it to the order
    if (payment) {
      const paymentData = new Payment({
        ...payment,
        order: order._id,
      });

      await paymentData.save();

      // Update order status based on payment status
      if (paymentData.status === "failed") {
        order.status = "Cancelled";
      } else if (paymentData.status === "pending") {
        order.status = "Pending";
      } else if (paymentData.status === "completed") {
        order.status = "Processing";
      }

      order.payment = paymentData._id;
      await order.save();
    }

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
    const { page = 1, limit = 10 } = req.query;

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    if (isNaN(parsedLimit) || isNaN(parsedPage)) {
      return res.status(400).json({
        success: false,
        message: "Invalid page or limit query parameters",
      });
    }

    const orders = await Order.find()
      .populate("products.product")
      .populate("coupon")
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    const totalItems = await Order.countDocuments();
    const totalSalesAmount = orders.reduce((total, order) => {
      const orderTotal = order.products.reduce((sum, product) => {
        if (product.product) {
          return sum + (product.product.price || 0) * product.quantity;
        }
        return sum;
      }, 0);
      return total + orderTotal;
    }, 0);

    res.status(200).json({
      success: true,
      data: { orders },
      totalItems,
      totalPages: Math.ceil(totalItems / parsedLimit),
      currentPage: parsedPage,
      totalSalesAmount,
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
    const user = req.user;
    const updateData = req.body;

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (
      updateData.status &&
      !validStatuses.includes(updateData.status.toLowerCase())
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const order = await Order.findById(id)
      .populate("products.product")
      .populate("payment");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (user.role === "admin" || user.isAdmin) {
      for (let key in updateData) {
        if (updateData.hasOwnProperty(key)) {
          if (key === "status") {
            order.status = updateData[key].toLowerCase();
          } else if (key === "products" && Array.isArray(updateData[key])) {
            order.products = updateData[key];
          } else {
            order[key] = updateData[key];
          }
        }
      }

      // Check if payment status needs to be updated
      if (order.payment) {
        const payment = await Payment.findById(order.payment);
        if (payment) {
          if (payment.status === "failed") {
            order.status = "Cancelled";
          } else if (payment.status === "pending") {
            order.status = "Pending";
          } else if (payment.status === "completed") {
            order.status = "Processing";
          }
        }
      }
    } else {
      if (
        updateData.status &&
        updateData.status.toLowerCase() === "cancelled"
      ) {
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
      message: "Order updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating order",
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

const getOrdersByLoggedInUser = async (req, res) => {
  try {
    // Ensure user is authenticated
    const userId = req.user.id;
    console.log("userId:", userId);

    // Validate the userId
    if (!userId ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or missing user ID",
      });
    }

    // Fetch orders for the logged-in user
    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .populate("coupon");

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this user",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
      message: "Your Orders fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching orders",
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
  getOrdersByLoggedInUser,
};
