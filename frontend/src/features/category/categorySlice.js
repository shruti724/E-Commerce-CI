import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch categories
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await axios.get("/api/categories");
    console.log("data: ",response.data.data);
    return response.data.data;
  }
);

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (categoryData) => {
    const response = await axios.post("/api/category", categoryData);
    return response.data.data;
  }
);

// Delete category
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId) => {
    await axios.delete(`/api/category/${categoryId}`);
    return categoryId;
  }
);

// Update category
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async (category) => {
    const response = await axios.put(
      `/api/categories/${category._id}`,
      category
    );
    return response.data;
  }
);

export const bulkDeleteCategories = createAsyncThunk(
  "category/bulkDeleteCategories",
  async (categoryIds) => {
    await axios.post(`/api/categories/bulk-delete`, { ids: categoryIds });
    return categoryIds;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (category) => category._id !== action.payload
        );
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.data = state.data.map((category) =>
          category._id === action.payload._id ? action.payload : category
        );
      })
      .addCase(bulkDeleteCategories.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (category) => !action.payload.includes(category._id)
        );
      });
  },
});

export default categorySlice.reducer;
