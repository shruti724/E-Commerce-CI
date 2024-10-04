const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkAdmin = require("../middlewares/isAdmin")

// Create a new order
router.post("/order",  orderController.createOrder);

// Get a list of orders
router.get("/orders",  orderController.getOrders);

// Get order by ID
router.get("/order/:id",  orderController.getOrderById);

router.get("/orderuser",  orderController.getOrdersByLoggedInUser);

// Update order status
router.put(
  "/order/:id",
 
  orderController.updateOrderStatus
);

// Delete an order
router.delete("/order/:id",  orderController.deleteOrder);

module.exports = router;
