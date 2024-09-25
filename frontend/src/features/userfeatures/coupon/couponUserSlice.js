import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  coupons: [],
  loading: false,
  error: null,
};

// Thunks for async actions
export const fetchCoupons = createAsyncThunk(
  "coupon/fetchCoupons",
  async (_, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.get("/api/coupons");
      console.log("response:", response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch coupons");
    }
  }
);

export const applyCoupon = createAsyncThunk(
  "coupon/applyCoupon",
  async (couponCode, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.post("/api/coupons/apply", {
        code: couponCode,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to apply coupon");
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
        state.error = action.payload || action.error.message;
      })
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {} = couponUserSlice.actions;
export default couponUserSlice.reducer;
