const Product = require("../models/productModel");
const CartItem = require("../models/cartModel");
const User = require("../models/userModel");
const slugify = require("slugify");

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id;

    // Validate quantity
    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    // To check if the product exists
    const product = await Product.findById(product_id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // To check if the cart item already exists
    let cartItem = await CartItem.findOne({ user_id, product_id });
    if (cartItem) {
      // To check if enough stock is available for the requested quantity or not
      if (product.quantity < cartItem.quantity + quantity) {
        return res.status(400).json({
          success: false,
          message: "Not enough stock available to add the requested quantity",
        });
      }
      cartItem.quantity += quantity;
    } else {
      if (product.quantity < quantity) {
        return res.status(400).json({
          success: false,
          message: "Not enough stock available",
        });
      }
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

// Get current user's cart with pagination
const getCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { page = 1, limit = 10 } = req.query;

    const cartItems = await CartItem.find({ user_id })
      .populate("product_id")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalItems = await CartItem.countDocuments({ user_id });

    res.status(200).json({
      success: true,
      data: {
        cartItems,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: parseInt(page),
      },
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
    const updateData = req.body;

    const cartItem = await CartItem.findById(id);
    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    const product = await Product.findById(cartItem.product_id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update quantity based on updateData
    if (updateData.quantity !== undefined) {
      if (updateData.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Quantity must be at least 1",
        });
      }
      // Check stock available or not
      if (product.quantity < updateData.quantity) {
        return res.status(400).json({
          success: false,
          message: "Not enough stock available",
        });
      }
      cartItem.quantity = updateData.quantity;
    }

    if (updateData.action) {
      switch (updateData.action) {
        case "plus":
          if (product.quantity <= cartItem.quantity) {
            return res.status(400).json({
              success: false,
              message: "Not enough stock available to increment",
            });
          }
          cartItem.quantity += 1;
          break;

        case "minus":
          if (cartItem.quantity <= 1) {
            return res.status(400).json({
              success: false,
              message: "Quantity cannot be less than 1",
            });
          }
          cartItem.quantity -= 1;
          break;

        default:
          return res.status(400).json({
            success: false,
            message: "Invalid action",
          });
      }
    }

    if (updateData.product_id) cartItem.product_id = updateData.product_id;
    cartItem.updated_at = Date.now();

    // Save the updated cart item
    await cartItem.save();

    res.status(200).json({
      success: true,
      data: cartItem,
      message: "Cart item updated successfully",
    });
  } catch (error) {
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
