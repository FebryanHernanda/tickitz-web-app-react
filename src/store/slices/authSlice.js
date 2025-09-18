import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: "",
  role: "",
  token: "",
  loading: false,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/auth/register", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/auth/login", {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(
        "http://127.0.0.1:8080/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  },
);

const authSlice = createSlice({
  initialState,
  name: "auth",
  // reducers: {
  //   setLogin: (state, action) => {
  //     state.isAuthenticated = true;
  //     state.user = action.payload.user;
  //     state.role = action.payload.role;
  //   },
  //   setLogout: (state) => {
  //     state.isAuthenticated = false;
  //     state.user = {};
  //     state.role = "";
  //   },
  // },
  extraReducers: (builder) => {
    builder
      /* =========================================== Register =========================================== */
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Login =========================================== */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.user = action.payload.email;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Logout =========================================== */
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.token = null;
        state.role = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
