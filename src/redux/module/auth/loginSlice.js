import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const doctorApi = import.meta.env.VITE_DOCTOR_API;
const patientApi = import.meta.env.VITE_PATIENT_API;

// Async thunk for login
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ username, password, role }, { rejectWithValue }) => {
    try {
      const apiUrl = role === "patient" ? patientApi : doctorApi;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        return rejectWithValue("Failed to fetch user data");
      }

      const users = await response.json();
      const user = users.find((u) => u.username === username);

      if (!user) return rejectWithValue("Username not found.");
      if (user.password !== password) return rejectWithValue("Incorrect password.");

      return { user, role };
    } catch (err) {
      return rejectWithValue("Something went wrong. Please try again.");
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    error: null,
    user: null,
    role: "patient",
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.role = action.payload.role;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setRole, logout } = loginSlice.actions;
export default loginSlice.reducer;
