const Product = require("../models/productModel");
const CartItem = require("../models/cartModel");

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id; 

    // Fetch the product using the product_id
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the cart item already exists
    let cartItem = await CartItem.findOne({ user_id, product_id });

    if (cartItem) {
      // If cart item exists, update the quantity
      cartItem.quantity += quantity;
    } else {
      // Create a new cart item
      cartItem = new CartItem({
        user_id,
        product_id,
        quantity,
      });
    }

    await cartItem.save();

    res.status(201).json({
      success: true,
      data: cartItem,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error adding product to cart",
      error: error.message,
    });
  }
};

// Get current user's cart
const getCart = async (req, res) => {
  try {
    const user_id = req.user.id; 
    const cartItems = await CartItem.find({ user_id }).populate("product_id");
    const users = await User.find({user_id}).populate("user_id")
    res.status(200).json({
      success: true,
      data: {cartItems, users},
      message: "Cart fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching cart",
      error: error.message,
    });
  }
};

// Update cart item
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Find cart item
    const cartItem = await CartItem.findById(id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      data: cartItem,
      message: "Cart item updated successfully",
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(400).json({
      success: false,
      message: "Error updating cart item",
      error: error.message,
    });
  }
};

// Remove product from cart
const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const cartItem = await CartItem.findByIdAndDelete(id);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error removing cart item",
      error: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
};
