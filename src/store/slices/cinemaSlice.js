import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

const initialState = {
  data: [],
  seatData: [],
  cinemaList: [],
  cinemaLocationList: [],
  loading: false,
  error: null,
};

export const getCinemaList = createAsyncThunk(
  "cinema/list",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/cinemas/list`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil data",
      );
    }
  },
);

export const getCinemaLocation = createAsyncThunk(
  "cinema/location",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/cinemas/location`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil data",
      );
    }
  },
);

export const getCinemaSchedule = createAsyncThunk(
  "cinema/filter",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams();

      const movieID = params.movieId;

      if (params.location) query.append("location", params.location);
      if (params.date) query.append("date", params.date);
      if (params.time) query.append("time", params.time);

      const response = await axios.get(
        `${API_URL}/cinemas/${movieID}?${query.toString()}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Gagal ambil data",
      );
    }
  },
);

export const getSoldSeat = createAsyncThunk(
  "cinema/available-seats",
  async (cinemaID, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/cinemas/available-seats/${cinemaID}`,
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
      /* =========================================== Get Cinema List=========================================== */
      .addCase(getCinemaList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCinemaList.fulfilled, (state, action) => {
        state.loading = false;
        state.cinemaList = action.payload.data;
      })
      .addCase(getCinemaList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Get Cinema Location=========================================== */
      .addCase(getCinemaLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCinemaLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.cinemaLocationList = action.payload.data;
      })
      .addCase(getCinemaLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      })
      /* =========================================== Get cinema seat data =========================================== */
      .addCase(getSoldSeat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSoldSeat.fulfilled, (state, action) => {
        state.loading = false;
        state.seatData = action.payload.data;
      })
      .addCase(getSoldSeat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cinemaSlice.reducer;
