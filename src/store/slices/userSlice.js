import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const getProfile = createAsyncThunk(
  "user/profile/data",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "user/profile",
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.patch(
        ` ${API_URL}/profile/edit`,
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Update gagal");
    }
  },
);

export const updatePassword = createAsyncThunk(
  "user/profile/password",
  async (fileData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const formData = new FormData();
      formData.append("old_password", fileData.oldPassword);
      formData.append("new_password", fileData.newPassword);

      const response = await axios.patch(
        `${API_URL}/profile/editpassword`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Update gagal");
    }
  },
);

const userSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
    resetData: () => initialState,
    addUser: (state, action) => {
      state.userData.push(action.payload);
    },
    addOrder: (state, action) => {
      const { userId, orders, isPaid } = action.payload;
      const user = state.userData.find((item) => item.id === userId);

      if (user) {
        user.order.push({ orders, isPaid });
      }
    },
    updatePaymentData: (state, action) => {
      const { userId, formData } = action.payload;

      const fullName = `${formData?.firstName} ${formData?.lastName}`;

      const index = state.userData.findIndex((item) => item.id === userId);

      if (index !== -1) {
        state.userData[index] = {
          ...state.userData[index],
          fullName: formData?.fullName || fullName,
          email: formData?.email,
          phoneNumber: formData?.phoneNumber,
        };
      }
    },
    editUser: (state, action) => {
      const { userId, formData } = action.payload;

      const fullName = `${formData?.firstName} ${formData?.lastName}`;

      const index = state.userData.findIndex((item) => item.id === userId);

      if (index !== -1) {
        state.userData[index] = {
          ...state.userData[index],
          fullName: formData?.fullName || fullName,
          email: formData?.email,
          phoneNumber: formData?.phoneNumber,
          password: formData?.confirmPassword,
        };
      }
    },
    resetPassword: (state, action) => {
      const { userId, formData } = action.payload;

      const index = state.userData.findIndex((item) => item.id === userId);

      if (index !== -1) {
        state.userData[index] = {
          ...state.userData[index],
          password: formData.password,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      /* =========================================== Get Data =========================================== */
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Update =========================================== */
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        // state.userData = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Update Password =========================================== */
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addUser,
  addOrder,
  updatePaymentData,
  editUser,
  resetPassword,
  resetData,
} = userSlice.actions;

export default userSlice.reducer;
