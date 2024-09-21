import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state for the orders
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching orders
export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  try {
    const response = await axios.get("/api/orderuser"); 
    console.log("userorder:", response)
    console.log("Hello")
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Create the orders slice
const orderUserSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the async thunk
// export { fetchOrders };

// Export the reducer
export default orderUserSlice.reducer;
