const express = require("express");
const {
  addToWishList,
  getWishList,
  removeWishListItem,
} = require("../controller/wishlistController");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/wishlist", getWishList);
router.post("/wishlist",  addToWishList);
router.delete("/wishlist/:id", removeWishListItem);

module.exports = router;
