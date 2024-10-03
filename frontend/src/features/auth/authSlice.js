import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
// import axios from 'axios';


// signupUser async thunk using extra: api
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (signupData, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.post("/api/register", signupData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred during signup"
      );
    }
  }
);

// loginUser async thunk using extra: api
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (loginData, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.post("/api/login", loginData, {
        withCredentials: true
      });
       
      const localStorageToken = response.data.data.token
      const localStorageRole = response.data.data.payload.user.role 
       console.log("response: ", response.data.data)
       
       localStorage.setItem('token', localStorageToken)
       localStorage.setItem('role', localStorageRole)
       
      return response.data;

    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: !!Cookies.get('token'),
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
    // Handle signup actions
     builder
       .addCase(signupUser.pending, (state) => {
         state.isLoading = true;
         state.error = null;
       })
       .addCase(signupUser.fulfilled, (state, action) => {
         state.user = action.payload.data; 
         state.isAuthenticated = true;
         state.isLoading = false;
         
       })
       .addCase(signupUser.rejected, (state, action) => {
         state.isAuthenticated = false;
         state.isLoading = false;
         state.error = action.payload || action.error.message;
       });

    // Handle login actions
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
        //  localStorage.setItem("token", action.payload.data.token);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Payload: ", action.payload)
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.isLoading = false;
        // localStorage.setItem("token", action.payload.data.token);
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

// Export the logout action and the auth reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
