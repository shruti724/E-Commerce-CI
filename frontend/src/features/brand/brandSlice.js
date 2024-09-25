import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch brands
export const fetchBrands = createAsyncThunk(
  "brand/fetchBrands",
  async (_, { extra: api }) => {
    // Accessing the Axios instance
    const response = await api.get("/api/brands"); 
    console.log(response.data.data);
    return response.data.data;
  }
);

export const addBrand = createAsyncThunk(
  "brand/addBrand",
  async (brandData, { extra: api }) => {
    // Accessing the Axios instance
    const response = await api.post("/api/brand", brandData); // Using the Axios instance
    return response.data.data;
  }
);

// Update brand
export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async (updatedBrand, { extra: api }) => {
    // Accessing the Axios instance
    const response = await api.put(
      `/api/brands/${updatedBrand._id}`,
      updatedBrand
    ); // Using the Axios instance
    return response.data.data; // Adjust based on the response structure if necessary
  }
);

// Delete brand
export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (brandId, { extra: api }) => {
    // Accessing the Axios instance
    await api.delete(`/api/brand/${brandId}`); // Using the Axios instance
    return brandId;
  }
);

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
    pagination: {}, // Include pagination in the state if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload; // Set the brands array
        // Optionally handle pagination if needed
        // state.pagination = action.payload.pagination;
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.data = state.data.map((brand) =>
          brand._id === action.payload._id ? action.payload : brand
        );
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.data = state.data.filter((brand) => brand._id !== action.payload);
      })
      .addCase(addBrand.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default brandSlice.reducer;
