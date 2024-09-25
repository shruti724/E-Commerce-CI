import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// loginUser async thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue, extra:api }) => {
    try {
      const response = await api.post("/api/login", loginData);
      console.log("Response: ",response)
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token"); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user; 
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
