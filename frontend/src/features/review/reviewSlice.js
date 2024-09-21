import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks

// Fetch all reviews for a product
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (reviewId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/reviews`);
      console.log("reviewID: ", reviewId);
      console.log("data: ", response.data);
      return { reviews: response.data.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add a new review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (reviewData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/reviews", reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Edit an existing review
export const editReview = createAsyncThunk(
  "reviews/editReview",
  async ({ reviewId, reviewData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/reviews/${reviewId}`);
      return reviewId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Bulk delete reviews
export const bulkDelete = createAsyncThunk(
  "reviews/bulkDelete",
  async (reviewIds, { rejectWithValue }) => {
    try {
      await axios.post(`/api/reviews/bulk-delete`, { ids: reviewIds });
      return reviewIds;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Update the status of a review
export const updateReviewStatus = createAsyncThunk(
  "reviews/updateReviewStatus",
  async ({ reviewId, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/review/${reviewId}/status`, {
        status,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  reviews: [], // List of reviews
  isLoading: false,
  isError: false,
  errorMessage: "",
};

// Slice
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.reviews;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to fetch reviews.";
      })

      // Add Review
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to add review.";
      })

      // Edit Review
      .addCase(editReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(editReview.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedReview = action.payload;
        const index = state.reviews.findIndex(
          (r) => r._id === updatedReview._id
        );
        if (index !== -1) {
          state.reviews[index] = updatedReview;
        }
      })
      .addCase(editReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to edit review.";
      })

      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload
        );
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to delete review.";
      })

      // Bulk Delete Reviews
      .addCase(bulkDelete.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(bulkDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = state.reviews.filter(
          (review) => !action.payload.includes(review._id)
        );
      })
      .addCase(bulkDelete.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Failed to delete reviews.";
      })

      // Update Review Status
      .addCase(updateReviewStatus.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(updateReviewStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedReview = action.payload;
        const index = state.reviews.findIndex(
          (r) => r._id === updatedReview._id
        );
        if (index !== -1) {
          state.reviews[index].status = updatedReview.status;
        }
      })
      .addCase(updateReviewStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage =
          action.payload || "Failed to update review status.";
      });
  },
});

export default reviewSlice.reducer;
