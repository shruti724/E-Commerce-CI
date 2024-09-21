const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/isAdmin")

// Create a new order
router.post("/order", authMiddleware, orderController.createOrder);

// Get a list of orders
router.get("/orders", authMiddleware, orderController.getOrders);

// Get order by ID
router.get("/order/:id", authMiddleware, orderController.getOrderById);

router.get("/orderuser", authMiddleware, orderController.getOrdersByLoggedInUser);

// Update order status
router.put(
  "/order/:id",
  authMiddleware,
  checkAdmin,
  orderController.updateOrderStatus
);

// Delete an order
router.delete("/order/:id", authMiddleware, orderController.deleteOrder);

module.exports = router;
