import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch coupons
export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async (_, { extra: api }) => {
    const response = await api.get("/api/coupons");
    return response.data.data; 
  }
);

// Delete coupon
export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (id, { extra: api }) => {
    await api.delete(`/api/coupons/${id}`);
    return id;
  }
);

// Add coupon
export const addCoupon = createAsyncThunk(
  "coupons/addCoupon",
  async (couponData, { extra: api }) => {
    const response = await api.post("/api/coupon", couponData); 
    return response.data; 
  }
);

const couponSlice = createSlice({
  name: "coupons",
  initialState: {
    coupons: [],
    loading: false,
    error: null,
  },
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
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(
          (coupon) => coupon._id !== action.payload 
        );
      })
      .addCase(addCoupon.fulfilled, (state, action) => {
        state.coupons.push(action.payload); 
      });
  },
});

export default couponSlice.reducer;
