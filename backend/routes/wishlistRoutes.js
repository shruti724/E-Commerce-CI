const express = require("express");
const {
  addToWishList,
  getWishList,
  removeWishListItem,
} = require("../controller/wishlistController");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/wishlist", authMiddleware, getWishList);
router.post("/wishlist", authMiddleware, addToWishList);
router.delete("/wishlist/:id", authMiddleware, removeWishListItem);

module.exports = router;
