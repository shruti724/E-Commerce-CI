import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the initial state for the orders
const initialState = {
  orders: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching orders
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { extra: api, rejectWithValue }) => {
    try {
      const response = await api.get("/api/orderuser");
      console.log("user order:", response);
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch orders");
    }
  }
);

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
        state.error = action.payload || action.error.message;
      });
  },
});


// Export the reducer
export default orderUserSlice.reducer;
