import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  totalPages: 1,
  isError: false,
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ page = 1, limit = 5 }, { extra: api }) => {
    const response = await api.get(`/api/products?page=${page}&limit=${limit}`);
    return {
      products: response.data.data,
      totalPages: response.data.pagination.totalPages,
    };
  }
);

// Async thunk to delete a product
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { extra: api }) => {
    await api.delete(`/api/product/${productId}`);
    return productId;
  }
);

// Async thunk to add a product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (newProduct, { extra: api }) => {
    const response = await api.post("/api/product", newProduct);
    return response.data.data;
  }
);

// Async thunk to delete multiple products
export const bulkDelete = createAsyncThunk(
  "product/bulkDeleteProducts",
  async (productIds, { rejectWithValue, extra: api }) => {
    try {
      await api.post("/api/product/bulkdelete", { ids: productIds });
      return productIds;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to update a product
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (
    { productId, updatedProductData },
    { rejectWithValue, extra: api }
  ) => {
    try {
      const response = await api.put(
        `/api/product/${productId}`,
        updatedProductData
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(bulkDelete.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(bulkDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (product) => !action.payload.includes(product._id)
        );
      })
      .addCase(bulkDelete.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.map((product) =>
          product._id === action.payload._id ? action.payload : product
        );
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});


export default productSlice.reducer;
