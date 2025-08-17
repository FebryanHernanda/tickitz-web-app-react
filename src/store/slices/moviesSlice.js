import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/constants";

const initialState = {
  movies: [],
  upcomingMovies: [],
  genres: [],
  searchResults: [],
  totalPages: 1,
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const moviesResponse = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`,
      );

      return {
        results: moviesResponse.data.results,
        totalPages: moviesResponse.data.total_pages,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchUpcomingMovies = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async (_, { rejectWithValue }) => {
    try {
      const upcomingMoviesResponse = await axios.get(
        `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&page=1`,
      );

      return upcomingMoviesResponse.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchMoviesGenres = createAsyncThunk(
  "movies/fetchMoviesGenres",
  async (_, { rejectWithValue }) => {
    try {
      const genreResponse = await axios.get(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
      );

      return genreResponse.data.genres;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchMoviesByGenres = createAsyncThunk(
  "movies/fetchMoviesByGenres",
  async (selectedGenres, { rejectWithValue }) => {
    try {
      const filterResponse = await axios.get(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenres}`,
      );

      return filterResponse.data.results;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSearchMovies = createAsyncThunk(
  "movies/search",
  async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
      const searchResponse = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,
      );

      return {
        results: searchResponse.data.results,
        totalPages: searchResponse.data.total_pages,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===========================================fetch Upcoming Movies=========================================== */
      .addCase(fetchUpcomingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingMovies = action.payload;
      })
      .addCase(fetchUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===========================================fetch data genres Movie=========================================== */
      .addCase(fetchMoviesGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.genres = action.payload;
      })
      .addCase(fetchMoviesGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===========================================Search Movie=========================================== */
      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload.results;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ===========================================Fetch Movie by Genres=========================================== */
      .addCase(fetchMoviesByGenres.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByGenres.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMoviesByGenres.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
