const express = require("express");
const router = express.Router();
const reviewController = require("../controller/reviewController");
const authMiddleware = require("../middlewares/authMiddleware");

// Create a new review
router.post("/reviews", authMiddleware, reviewController.createReview);

// Get a list of reviews
router.get("/reviews", authMiddleware, reviewController.getReviews);

// Get review by ID
router.get("/reviews/:id", authMiddleware, reviewController.getReviewById);

// Update review
router.put("/reviews/:id", authMiddleware, reviewController.updateReview);

// Delete a review
router.delete(
  "/reviews/:id",
  authMiddleware,
  reviewController.deleteReview
);

module.exports = router;
