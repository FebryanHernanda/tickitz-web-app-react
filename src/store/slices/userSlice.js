import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

      const response = await axios.get("http://127.0.0.1:8080/profile", {
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
  async (fileData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      console.log(fileData);

      const formData = new FormData();
      formData.append("first_name", fileData.firstName);
      formData.append("last_name", fileData.lastName);
      formData.append("phone_number", fileData.phoneNumber);
      formData.append("email", fileData.email);
      formData.append("image", fileData.avatarPath);

      const response = await axios.patch(
        "http://127.0.0.1:8080/profile/edit",
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

export const updatePassword = createAsyncThunk(
  "user/profile/password",
  async (fileData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const formData = new FormData();
      formData.append("old_password", fileData.oldPassword);
      formData.append("new_password", fileData.newPassword);

      const response = await axios.patch(
        "http://127.0.0.1:8080/profile/editpassword",
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
