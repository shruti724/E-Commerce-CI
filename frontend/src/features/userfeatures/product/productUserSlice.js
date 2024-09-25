import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "productUser/fetchProducts",
  async (_, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.get("/api/products");
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );
    }
  }
);

// Async thunk to fetch a product by ID
export const fetchProductById = createAsyncThunk(
  "productUser/fetchProductById",
  async (productId, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.get(`/api/product/${productId}`);
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch product");
    }
  }
);

// Initial state
const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

// Create product slice
const productUserSlice = createSlice({
  name: "productUser",
  initialState,
  reducers: {
    // Additional reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product";
      });
  },
});

export default productUserSlice.reducer;
