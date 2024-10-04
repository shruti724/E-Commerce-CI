const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

// Create a new review
router.post("/reviews", reviewController.createReview);

// Get a list of reviews
router.get("/reviews", reviewController.getReviews);

// Get review by ID
router.get("/reviews/:id", reviewController.getReviewById);

// Update review
router.put("/reviews/:id", reviewController.updateReview);

// Delete a review
router.delete(
  "/reviews/:id",
  reviewController.deleteReview
);

module.exports = router;
