import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching the wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async () => {
    const response = await axios.get("/api/wishlist");
    return response.data.data; // Extract the data from the response
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [], // Initialize as an array
    loading: false,
    error: null,
  },
  reducers: {
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter((item) => item._id !== action.payload);
    },
    addToWishlist(state, action) {
      // Handle adding to wishlist if needed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload; // Set the wishlist data
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeFromWishlist, addToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
