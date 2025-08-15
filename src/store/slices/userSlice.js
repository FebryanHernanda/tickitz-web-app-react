import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [
    {
      id: 1,
      email: "admin@gmail.com",
      password: "@Admin12345",
      role: "admin",
    },
  ],
};

const userSlice = createSlice({
  initialState,
  name: "users",
  reducers: {
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
  },
});

export const { addUser, addOrder, editUser } = userSlice.actions;

export default userSlice.reducer;
