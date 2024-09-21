const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

// Create a new review
const createReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;
    const user = req.user.id; 

    const productData = await Product.findById(product);
    if (!productData) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const review = new Review({
      product,
      user,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json({
      success: true,
      data: review,
      message: "Review created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

// Get a list of reviews
const getReviews = async (req, res) => {
  try {
    const page = req.pagination?.page || 1;
    const limit = req.pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const reviews = await Review.find()
      .skip(skip)
      .limit(limit)
      .populate("product user");

    res.status(200).json({
      success: true,
      data: reviews,
      message: "Reviews fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(400).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};


// Get review by ID
const getReviewById = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findById(id).populate("product user");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      data: review,
      message: "Review fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error fetching review",
      error: error.message,
    });
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    res.status(200).json({
      success: true,
      data: review,
      message: "Review updated successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
