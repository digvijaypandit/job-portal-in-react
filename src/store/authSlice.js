import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

//Utility: Check if token is expired
const isTokenExpired = (exp) => Date.now() >= exp * 1000;

//Load user from token (if valid)
const token = localStorage.getItem("token");
let user = null;

if (token) {
  try {
    const decoded = jwtDecode(token);
    if (!isTokenExpired(decoded.exp)) {
      user = {
        id: decoded.id,
        email: decoded.sub,
        roles: decoded.roles,
      };
    } else {
      localStorage.removeItem("token");
    }
  } catch (e) {
    localStorage.removeItem("token");
  }
}

//Async Thunks

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/auth/login`,
        userData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${VITE_BASE_URL}/auth/register`,
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return rejectWithValue("No token found");

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("roles");

      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user,
    token,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const token = action.payload.accessToken;
        const decoded = jwtDecode(token);

        state.loading = false;
        state.token = token;
        state.user = {
          id: decoded.id,
          email: decoded.sub,
          roles: decoded.roles,
        };

        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userId", decoded.id);
        localStorage.setItem("roles", JSON.stringify(decoded.roles));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
