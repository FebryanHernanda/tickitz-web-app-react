import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userAdmin: {
    email: "admin@gmail.com",
    password: "@Admin12345",
    role: "admin",
  },
  dataMovies: [],
  lastId: 0,
};

const adminSlice = createSlice({
  initialState,
  name: "admin",
  reducers: {
    addMoviesData: (state, action) => {
      state.dataMovies.push(action.payload);
    },
    deleteMoviesData: (state, action) => {
      state.dataMovies = state.dataMovies.filter(
        (item) => item.id !== action.payload,
      );
    },
    editMoviesData: (state, action) => {
      const index = state.dataMovies.findIndex(
        (movie) => movie.id === action.payload.id,
      );

      if (index !== -1) {
        state.dataMovies[index] = {
          ...state.dataMovies[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { addMoviesData, deleteMoviesData, editMoviesData } =
  adminSlice.actions;

export default adminSlice.reducer;
