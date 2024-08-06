const Payment = require("../models/paymentModel");
const User = require("../models/userModel");
const Order = require("../models/orderModel")

// Process a payment
const processPayment = async (req, res) => {
  try {
    const { paymentType, upiId, paymentId, amount, status, orderId } = req.body;
    const user_id = req.user.id;

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const payment = new Payment({
      user: user_id,
      paymentType,
      upiId,
      paymentId,
      amount,
      status,
    });

    await payment.save();

    await updateOrderStatusByPayment(status, orderId, payment._id);

    res.status(201).json({
      success: true,
      data: payment,
      message: "Payment processed successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error processing payment",
      error: error.message,
    });
  }
};

// Update order status based on payment status
const updateOrderStatusByPayment = async (
  paymentStatus,
  orderId,
  paymentId
) => {
  try {
    const order = await Order.findById(orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    if (paymentStatus === "failed") {
      order.status = "Cancelled";
    } else if (paymentStatus === "pending") {
      order.status = "Pending";
    } else if (paymentStatus === "completed") {
      order.status = "Processing";
    }

    // Set the payment reference
    order.payment = paymentId;

    await order.save();
  } catch (error) {
    console.error(`Error updating order status: ${error.message}`);
  }
};


// Get payment details
const getPaymentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id).populate("user");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
      message: "Payment details fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching payment details",
      error: error.message,
    });
  }
};


module.exports = {
  processPayment,
  getPaymentDetails,
};
