const WishListItem = require("../models/wishlistModel");

// Add product to wishlist
const addToWishList = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    let wishListItem = await WishListItem.findOne({ user_id, product_id });
    if (wishListItem) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    wishListItem = new WishListItem({
      user_id,
      product_id,
    });

    await wishListItem.save();
    res.status(201).json({
      success: true,
      data: wishListItem,
      message: "Product added to wishlist successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding product to wishlist",
      error: error.message,
    });
  }
};

// Get current user's wishlist
const getWishList = async (req, res) => {
  try {
    const user_id = req.user.id; 

    const wishListItems = await WishListItem.find({ user_id }).populate(
      "product_id"
    );
    res.status(200).json({
      success: true,
      data: wishListItems,
      message: "Wishlist fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching wishlist",
      error: error.message,
    });
  }
};

// Remove product from wishlist
const removeWishListItem = async (req, res) => {
  try {
    const { id } = req.params;

    const wishListItem = await WishListItem.findByIdAndDelete(id);
    if (!wishListItem) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Wishlist item removed successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error removing wishlist item",
      error: error.message,
    });
  }
};

module.exports = {
  addToWishList,
  getWishList,
  removeWishListItem,
};
