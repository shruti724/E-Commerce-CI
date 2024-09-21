const express = require("express");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} = require("../controller/cartController");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/cart", authMiddleware, getCart);
router.post("/cart", authMiddleware, addToCart);
router.put("/cart/:id", authMiddleware, updateCartItem);
router.delete("/cart/:id", authMiddleware, removeCartItem);

module.exports = router;
