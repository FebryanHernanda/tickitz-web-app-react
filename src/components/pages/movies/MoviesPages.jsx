import { ArrowLeft, ArrowRight, Loader2, Search } from "lucide-react";
import { MoviesList, Newslatters } from "../../organisms";

import heroBg from "/src/assets/background/background.png";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  fetchMoviesByGenres,
  fetchSearchMovies,
} from "../../../store/slices/moviesSlice";
import debounce from "lodash.debounce";

const MoviesPages = () => {
  const dispatch = useDispatch();

  const { searchResults, totalPages, movies, genres, loading } = useSelector(
    (state) => state.movies,
  );

  const [searchParams, setSearchParams] = useSearchParams("");

  const querySearch = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("pages") || "1");

  const [selectedGenres, setSelectedGenres] = useState(null);

  /* Reset Url Search Params */
  useEffect(() => {
    if (querySearch === "") {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("query");
      setSearchParams(newParams);
    }
  }, [querySearch, setSearchParams, searchParams]);

  /* fetching Movies by genres */
  useEffect(() => {
    if (selectedGenres) {
      dispatch(fetchMoviesByGenres(selectedGenres));
    }
  }, [dispatch, selectedGenres]);

  /* Search Logic with debounce library */
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchParams({ query: value, page: 1 });
  };

  /* Debounce function */
  const debouncedFetch = useMemo(
    () =>
      debounce((search, page) => {
        if (search && search.trim() !== "") {
          dispatch(fetchSearchMovies({ query: search, page }));
        } else {
          dispatch(fetchMovies({ page }));
        }
      }, 1000),
    [dispatch],
  );

  /* clear debounce */
  useEffect(() => {
    debouncedFetch(querySearch, currentPage);
    return () => {
      debouncedFetch.cancel();
    };
  }, [querySearch, currentPage, debouncedFetch]);

  /* Handle Paginations */
  const handlePaginations = (page) => {
    if (page < 1 || page > totalPages) return;
    setSearchParams({ query: querySearch, pages: page });
    debouncedFetch(querySearch, page);
  };

  /* Handle dynamic pages */
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, currentPage + 2);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  /* Handle Filter */
  const handleFilter = (genreId, value) => {
    setSelectedGenres(genreId);
    setSearchParams({ genres: value.toLowerCase() });
  };

  const listFilterGenres = {
    53: "Thriller",
    27: "Horror",
    10749: "Romance",
    878: "Sci-Fi",
  };

  const moviesData = querySearch ? searchResults : movies;

  return (
    <>
      <div>
        <section
          className="flex h-[700px] items-center bg-cover bg-center bg-no-repeat lg:justify-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7)), url(${heroBg})`,
          }}
        >
          <div className="flex w-full max-w-screen-2xl flex-col gap-5 p-5 text-white lg:p-10">
            <h3 className="text-xl">LIST MOVIE OF THE WEEK</h3>
            <h1 className="text-5xl lg:text-7xl">
              Experience the Magic of Cinema: Book Your Tickets Today
            </h1>
          </div>
        </section>
        <div className="mx-auto max-w-screen-2xl px-5 pt-5 lg:px-10">
          {/* <!-- Container After Hero --> */}
          <div className="flex flex-col gap-10">
            {/* <!-- Exciting Movies --> */}
            <section className="flex flex-col gap-10">
              <div className="flex flex-wrap gap-10 lg:flex-row lg:flex-nowrap">
                <div className="flex w-full flex-col gap-5 lg:w-100">
                  <h3 className="text-xl font-semibold">Cari Event</h3>
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full rounded-md border border-gray-300 p-2 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      value={querySearch}
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <h3 className="text-xl font-semibold">Filter</h3>
                  <ul className="flex gap-10">
                    {Object.entries(listFilterGenres).map(([key, value]) => {
                      return (
                        <li
                          key={key}
                          className={`cursor-pointer rounded-lg p-2 hover:bg-blue-700 hover:text-white ${selectedGenres === key && "bg-blue-700 text-white"}`}
                          onClick={() => handleFilter(key, value)}
                        >
                          {value}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="flex w-full flex-wrap justify-between gap-5">
                {loading ? (
                  <div className="flex w-full justify-center py-10">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                  </div>
                ) : searchResults?.length === 0 && querySearch ? (
                  <p className="w-full text-center text-black">
                    Film tidak ditemukan!
                  </p>
                ) : (
                  <MoviesList movies={moviesData} genres={genres} />
                )}
              </div>

              {/* <!-- Next list  --> */}
              <div className="flex items-center justify-center gap-5">
                <button
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${currentPage === 1 ? "!cursor-not-allowed bg-gray-400" : "bg-blue-600"} `}
                  onClick={() => handlePaginations(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft />
                </button>
                {pages.map((page) => {
                  return (
                    <button
                      key={page}
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${page === currentPage ? "bg-blue-600 text-white" : "bg-blue-200"} `}
                      onClick={() => handlePaginations(page)}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-white ${currentPage === 5 ? "!cursor-not-allowed bg-gray-400" : "bg-blue-600"} `}
                  onClick={() => handlePaginations(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ArrowRight />
                </button>
              </div>
              {/* <!-- Next List --> */}
            </section>

            <Newslatters />
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesPages;
