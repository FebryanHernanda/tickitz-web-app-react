import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";

const initialState = {
  movies: [],
  moviesDetails: [],
  upcomingMovies: [],
  popularMovies: [],
  genresList: [],
  directorsList: [],
  castList: [],
  page: 1,
  limit: 12,
  total: 0,
  total_pages: 0,
  loading: false,
  error: null,
};

export const getGenresMovies = createAsyncThunk(
  "movies/genres",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/movies/genres`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil data",
      );
    }
  },
);

export const getCastsMovies = createAsyncThunk(
  "movies/casts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/movies/casts`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil data",
      );
    }
  },
);

export const getDirectorsMovies = createAsyncThunk(
  "movies/directors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/movies/directors`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil data",
      );
    }
  },
);

export const getPopularMovies = createAsyncThunk(
  "movies/popular",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/movies/popular`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil data",
      );
    }
  },
);

export const getUpcomingMovies = createAsyncThunk(
  "movies/upcoming",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/movies/upcoming`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil data",
      );
    }
  },
);

export const getAllMovies = createAsyncThunk(
  "movies/getAll",
  async ({ page = 1 }) => {
    const res = await axios.get(`${API_URL}/movies?page=${page}`);
    return res.data;
  },
);

export const getMoviesSearch = createAsyncThunk(
  "movies/search",
  async (params = {}, { rejectWithValue }) => {
    const search = params?.search || "";
    const genre = params?.genre || "";
    const page = params?.page || 1;

    try {
      const response = await axios.get(
        `${API_URL}/movies?search=${search}&genre=${genre}&page=${page}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil data",
      );
    }
  },
);

export const getMoviesDetails = createAsyncThunk(
  "movies/details",
  async (movieID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/movies/${movieID}/details`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil data",
      );
    }
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder
      /* =========================================== Get Genres Movies=========================================== */
      .addCase(getGenresMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGenresMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.genresList = action.payload.data;
      })
      .addCase(getGenresMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Get Casts Movies=========================================== */
      .addCase(getCastsMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCastsMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.castList = action.payload.data;
      })
      .addCase(getCastsMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Get Directors Movies=========================================== */
      .addCase(getDirectorsMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDirectorsMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.directorsList = action.payload.data;
      })
      .addCase(getDirectorsMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Get Popular Movies=========================================== */
      .addCase(getPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload.data;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Get Upcoming Movies=========================================== */
      .addCase(getUpcomingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingMovies = action.payload.data;
      })
      .addCase(getUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Get All Movies =========================================== */
      .addCase(getAllMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.data;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(getAllMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      /* =========================================== Get Movies Search=========================================== */
      .addCase(getMoviesSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMoviesSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.data;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(getMoviesSearch.rejected, (state, action) => {
        state.movies = [];
        state.loading = false;
        state.error = action.payload;
      })
      /* =========================================== Get Movies Search=========================================== */
      .addCase(getMoviesDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMoviesDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesDetails = action.payload.data;
      })
      .addCase(getMoviesDetails.rejected, (state, action) => {
        state.moviesDetails = [];
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
