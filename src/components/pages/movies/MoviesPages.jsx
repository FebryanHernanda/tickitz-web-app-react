import { ArrowRight, Search } from "lucide-react";
import { MoviesList, Newslatters } from "../../organisms";

import heroBg from "/src/assets/background/background.png";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMovies,
  fetchMoviesByGenres,
  fetchSearchMovies,
  setSelectedGenres,
} from "../../../store/slices/moviesSlice";

const MoviesPages = () => {
  const dispatch = useDispatch();

  const { searchResults, movies, genres, selectedGenres, loading } =
    useSelector((state) => state.movies);

  const [searchParams, setSearchParams] = useSearchParams("");

  const querySearch = searchParams.get("query") || "";
  const currentPage = Number(searchParams.get("pages") || "1");

  /* Reset Url Search Params */
  useEffect(() => {
    setSearchParams("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* fetching Movies by genres */
  useEffect(() => {
    if (selectedGenres) {
      dispatch(fetchMoviesByGenres(selectedGenres));
    }
  }, [dispatch, selectedGenres]);

  /* fetching Movies by search */
  useEffect(() => {
    if (querySearch && querySearch.trim() !== "") {
      dispatch(fetchSearchMovies({ query: querySearch, page: currentPage }));
    } else {
      dispatch(fetchMovies({ page: currentPage }));
    }
  }, [dispatch, querySearch, currentPage]);

  /* Handle Search */
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchParams({ query: value, page: 1 });
  };

  /* Handle Paginations */
  const handlePaginations = (page) => {
    setSearchParams({ query: querySearch, pages: page });
  };

  /* Handle Filter */
  const handleFilter = (genreId, value) => {
    dispatch(setSelectedGenres(genreId));
    setSearchParams({ filter: value });
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
                {querySearch === "" ||
                querySearch === null ||
                querySearch === undefined ||
                searchResults.length > 0 ? (
                  <MoviesList
                    movies={moviesData}
                    genres={genres}
                    loading={loading}
                  />
                ) : (
                  <p className="w-full text-center text-black">
                    Film tidak ditemukan!
                  </p>
                )}
              </div>

              {/* <!-- Next list  --> */}
              <div className="flex items-center justify-center gap-5">
                {[1, 2, 3, 4, 5].map((page) => {
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

                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
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
