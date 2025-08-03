import { useEffect, useState } from "react";
import { MovieCard } from "../../molecules";
import { getGenreMovies, getPopularMovies } from "../../../data";

const MovieList = ({ limits }) => {
  const apiKey = import.meta.env.VITE_META_API_KEY;
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [moviesData, genresData] = await Promise.all([
          getPopularMovies(apiKey),
          getGenreMovies(apiKey),
        ]);

        setMovies(moviesData);
        setGenres(genresData);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [apiKey]);

  const displayedMovies = limits ? movies.slice(0, limits) : movies;

  return (
    <>
      {loading ? <p className="w-full items-center">Loading...</p> : null}
      {displayedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </>
  );
};

export default MovieList;
