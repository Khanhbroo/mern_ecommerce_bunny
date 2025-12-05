import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users (admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken") as string
        )}`,
      },
    }
  );

  return response.data;
});

// Add the create user action
export const addUser = createAsyncThunk(
  "admin/addUSer",
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("userToken") as string
            )}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue((error as any).response.data);
    }
  }
);

// Update user info
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }: { id: string | number; name?: string; email?: string; role?: string }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
      { name, email, role },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(
            localStorage.getItem("userToken") as string
          )}`,
        },
      }
    );

    return response.data.updatedUser;
  }
);

// Delete an user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id: string | number) => {
  await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("userToken") as string
        )}`,
      },
    }
  );
  return id;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    loading: false,
    error: null,
  } as { users: any[]; loading: boolean; error: string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push((action.payload as any).user); // add a new user to state
      })
      .addCase(addUser.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state: any, action) => {
        const updatedUser = action.payload;

        const userIndex = state.users.findIndex(
          (user: any) => user._id === updatedUser._id
        );

        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user: any) => user._id !== action.payload);
      });
  },
});

export default adminSlice.reducer;
