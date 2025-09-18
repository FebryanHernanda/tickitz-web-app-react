import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY, BASE_URL } from "../../utils/constants";

const initialState = {
  movies: [],
  moviesDetails: [],
  upcomingMovies: [],
  popularMovies: [],
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

export const getPopularMovies = createAsyncThunk(
  "movies/popular",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/movies/popular");

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
      const response = await axios.get("http://127.0.0.1:8080/movies/upcoming");

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Gagal mengambil data",
      );
    }
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
        `http://localhost:8080/movies?search=${search}&genre=${genre}&page=${page}`,
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
      const response = await axios.get(
        `http://localhost:8080/movies/${movieID}/details`,
      );

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
      /* =========================================== Get Movies Search=========================================== */
      .addCase(getMoviesSearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMoviesSearch.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.data;
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
    /* ! OLD DATA */
    // /* ===========================================fetch  Movies=========================================== */
    // .addCase(fetchMovies.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchMovies.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.movies = action.payload.results;
    //   state.totalPages = action.payload.totalPages;
    // })
    // .addCase(fetchMovies.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })

    // /* ===========================================fetch Upcoming Movies=========================================== */
    // .addCase(fetchUpcomingMovies.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchUpcomingMovies.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.upcomingMovies = action.payload;
    // })
    // .addCase(fetchUpcomingMovies.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })

    // /* ===========================================fetch data genres Movie=========================================== */
    // .addCase(fetchMoviesGenres.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchMoviesGenres.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.genres = action.payload;
    // })
    // .addCase(fetchMoviesGenres.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })

    // /* ===========================================Search Movie=========================================== */
    // .addCase(fetchSearchMovies.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchSearchMovies.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.searchResults = action.payload.results;
    //   state.totalPages = action.payload.totalPages;
    // })
    // .addCase(fetchSearchMovies.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })

    // /* ===========================================Fetch Movie by Genres=========================================== */
    // .addCase(fetchMoviesByGenres.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(fetchMoviesByGenres.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.movies = action.payload;
    // })
    // .addCase(fetchMoviesByGenres.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export default moviesSlice.reducer;
