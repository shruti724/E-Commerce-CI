import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk for fetching the wishlist
export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.get("/api/wishlist");
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch wishlist"
      );
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [], 
    loading: false,
    error: null,
  },
  reducers: {
    removeFromWishlist(state, action) {
      state.wishlist = state.wishlist.filter(
        (item) => item._id !== action.payload
      );
    },
    addToWishlist(state, action) {
      state.wishlist.push(action.payload); 
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
        state.wishlist = action.payload; 
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message; 
      });
  },
});

export const { removeFromWishlist, addToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
