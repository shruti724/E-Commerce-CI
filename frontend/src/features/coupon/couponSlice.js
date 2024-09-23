import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCoupons = createAsyncThunk(
  "coupons/fetchCoupons",
  async () => {
    const response = await axios.get("/api/coupons");
    return response.data.data;
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupons/deleteCoupon",
  async (id) => {
    await axios.delete(`/api/coupons/${id}`);
    return id; // Return the id of the deleted coupon
  }
);

export const addCoupon = createAsyncThunk(
  "coupons/addCoupon",
  async (couponData) => {
    const response = await axios.post("/api/coupon", couponData);
    return response.data; // Return the created coupon data
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
        state.coupons.push(action.payload); // Add the new coupon to the list
      });
  },
});

export default couponSlice.reducer;
