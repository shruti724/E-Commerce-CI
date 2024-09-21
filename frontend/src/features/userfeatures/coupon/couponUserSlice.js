import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  coupons: [],
  loading: false,
  error: null,
};

// Thunks for async actions
export const fetchCoupons = createAsyncThunk(
  "coupon/fetchCoupons",
  async () => {
    const response = await axios.get("/api/coupons");
    console.log("response:", response.data)
    return response.data.data;
  }
);

export const applyCoupon = createAsyncThunk(
  "coupon/applyCoupon",
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/coupons/apply", {
        code: couponCode,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create slice
const couponUserSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        // Handle successful coupon application
        // For example, you might update a cart or user state
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});


export const {} = couponUserSlice.actions;
export default couponUserSlice.reducer;
