import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching all users
export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.get("/api/users");
      console.log("data:", response.data.data.users);
      return {
        users: response.data.data.users,
        totalPages: response.data.totalPages,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users"
      );
    }
  }
);

// Async thunk for creating a user
export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.post("/api/register", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

// Async thunk for fetching a user by ID
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (userId, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// Async thunk for updating a user
export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ userId, userData }, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.put(`/api/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update user"
      );
    }
  }
);

// Async thunk for deleting a user
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.delete(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete user"
      );
    }
  }
);

// Async thunk for soft deleting a user
export const softDeleteById = createAsyncThunk(
  "users/softDeleteById",
  async (userId, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.patch(`/api/users/${userId}/soft-delete`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to soft delete user"
      );
    }
  }
);

// Async thunk for uploading user media (profile picture or documents)
export const uploadMedia = createAsyncThunk(
  "users/uploadMedia",
  async ({ userId, formData }, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.post(`/api/users/${userId}/media`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload media"
      );
    }
  }
);

// Async thunk for fetching the user profile (current logged-in user)
export const getUserProfile = createAsyncThunk(
  "users/getUserProfile",
  async (_, { rejectWithValue, extra: api }) => {
    try {
      const response = await api.get("/api/profile");
      console.log("from slice:", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "users",
  initialState: {
    user: null,
    users: [],
    profile: null,
    status: "idle",
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.profile = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.users;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Get User By ID cases
    builder
      .addCase(getUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Update User cases
    builder
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedUser = action.payload;
        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Delete User cases
    builder
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter(
          (user) => user._id !== action.payload._id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Soft Delete User cases
    builder
      .addCase(softDeleteById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(softDeleteById.fulfilled, (state, action) => {
        state.status = "succeeded";
        const softDeletedUser = action.payload;
        state.users = state.users.map((user) =>
          user._id === softDeletedUser._id ? { ...user, isDeleted: true } : user
        );
      })
      .addCase(softDeleteById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Upload Media cases
    builder
      .addCase(uploadMedia.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = { ...state.user, media: action.payload };
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Get User Profile cases
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });

    // Create User cases
    builder
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
