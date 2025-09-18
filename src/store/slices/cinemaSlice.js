import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export const getCinemaSchedule = createAsyncThunk(
  "cinemas/filter",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();

      const movieID = params.movieId;

      if (params.location) query.append("location", params.location);
      if (params.date) query.append("date", params.date);
      if (params.time) query.append("time", params.time);

      const response = await axios.get(
        `http://localhost:8080/cinemas/${movieID}?${query.toString()}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal ambil data",
      );
    }
  },
);

const cinemaSlice = createSlice({
  name: "cinema",
  initialState,
  extraReducers: (builder) => {
    builder
      /* =========================================== Get cinema schedules =========================================== */
      .addCase(getCinemaSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCinemaSchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(getCinemaSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cinemaSlice.reducer;
