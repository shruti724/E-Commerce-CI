import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Initial state for orders
const initialState = {
  isLoading: false,
  data: [],
  orderDetails: null,
  totalPages: 1,
  isError: false,
};

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async ({ page = 1, limit = 5 }, { extra: api }) => {
    const response = await api.get(`/api/orders?page=${page}&limit=${limit}`);
    return {
      orders: response.data.data,
      totalPages: response.data.pagination.totalPages,
    };
  }
);

// Async thunk to fetch a single order by ID
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId, { extra: api }) => {
    const response = await api.get(`/api/order/${orderId}`);
    return response.data.data;
  }
);

// Async thunk to create a new order
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (newOrder, { extra: api }) => {
    const response = await api.post("/api/order", newOrder);
    return response.data.data;
  }
);

// Async thunk to update an order
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async ({ orderId, updatedOrderData }, { extra: api }) => {
    const response = await api.put(`/api/order/${orderId}`, updatedOrderData);
    return response.data.data;
  }
);

// Async thunk to delete an order
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, { extra: api }) => {
    await api.delete(`/api/order/${orderId}`);
    return orderId;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.orders;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Fetch Order By ID
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Update Order
      .addCase(updateOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(updateOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      // Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((order) => order._id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default orderSlice.reducer;
