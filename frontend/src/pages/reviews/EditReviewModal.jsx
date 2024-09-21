import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateReviewStatus } from "../../features/review/reviewSlice"; // Assuming this action is defined in your slice

const EditReviewModal = ({ review, onClose }) => {
  const dispatch = useDispatch();

  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [error, setError] = useState("");

  useEffect(() => {
    setRating(review.rating);
    setComment(review.comment);
  }, [review]);

  const handleSaveChanges = () => {
    // Validate inputs
    if (rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5.");
      return;
    }

    if (comment.trim() === "") {
      setError("Comment is required.");
      return;
    }

    // Dispatch the action to update the review
    dispatch(
      updateReviewStatus({
        reviewId: review._id,
        updatedReview: { rating, comment },
      })
    );

    onClose(); // Close the modal after saving
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Review</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                className="form-control"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="comment" className="form-label">
                Comment
              </label>
              <textarea
                id="comment"
                className="form-control"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditReviewModal;
