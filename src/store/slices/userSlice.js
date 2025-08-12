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
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
