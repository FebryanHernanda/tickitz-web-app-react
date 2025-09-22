import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

const initialState = {
  dataMovies: [],
  addMoviesData: [],
  movieEditDetail: null,
  page: 1,
  limit: 12,
  total: 0,
  total_pages: 0,
  loading: false,
  error: null,
};

export const getAllDataMovies = createAsyncThunk(
  "admin/allmovies",
  async ({ page = 1 } = {}, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      console.log(page);

      const response = await axios.get(`${API_URL}/admin/movies?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil data",
      );
    }
  },
);

export const getMovieEditDetail = createAsyncThunk(
  "admin/getMovieEditDetail",
  async (movieEditId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.get(
        `${API_URL}/admin/movies/${movieEditId}/edit-details`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil detail movie",
      );
    }
  },
);

export const editMoviesData = createAsyncThunk(
  "admin/editMoviesData",
  async ({ id, formData }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.patch(
        `${API_URL}/admin/movies/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Gagal update movie" },
      );
    }
  },
);

export const deleteMoviesData = createAsyncThunk(
  "admin/deletemoviesdata",
  async ({ id }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.delete(
        `${API_URL}/admin/movies/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Gagal update movie" },
      );
    }
  },
);

export const addMoviesData = createAsyncThunk(
  "admin/addMoviesData",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const response = await axios.post(
        `${API_URL}/admin/movies/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

// Thunk untuk menambahkan cinema schedule
export const addCinemasSchedule = createAsyncThunk(
  "admin/addCinemasSchedule",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;

      const { data } = await axios.post(
        `${API_URL}/admin/movies/cinemaschedule/add`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

const adminSlice = createSlice({
  initialState,
  name: "admin",
  extraReducers: (builder) => {
    builder
      /* =========================================== Get All Movies Data =========================================== */
      .addCase(getAllDataMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDataMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.dataMovies = action.payload.data;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(getAllDataMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Get Movies Edit Data =========================================== */
      .addCase(getMovieEditDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieEditDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movieEditDetail = action.payload.data;
      })
      .addCase(getMovieEditDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Add Movies Data =========================================== */
      .addCase(addMoviesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMoviesData.fulfilled, (state, action) => {
        state.loading = false;
        state.addMoviesData = action.payload.data;
      })
      .addCase(addMoviesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Edit Movies Data =========================================== */
      .addCase(editMoviesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editMoviesData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editMoviesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== delete Movies Data =========================================== */
      .addCase(deleteMoviesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMoviesData.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteMoviesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Add CinemasSchedule Data =========================================== */
      .addCase(addCinemasSchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCinemasSchedule.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addCinemasSchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
