const express = require("express");
const {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
} = require("../controller/cartController");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/cart", getCart);
router.post("/cart", addToCart);
router.put("/cart/:id", updateCartItem);
router.delete("/cart/:id", removeCartItem);

module.exports = router;
