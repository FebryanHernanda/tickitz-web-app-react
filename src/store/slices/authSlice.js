import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: "",
  role: "",
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setLogin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
    setLogout: (state) => {
      state.isAuthenticated = false;
      state.user = "";
      state.role = "";
    },
  },
});

export const { setLogin, setLogout } = authSlice.actions;

export default authSlice.reducer;
