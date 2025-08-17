import { MovieCard } from "../../molecules";
import { Loader2 } from "lucide-react";

const MovieList = ({ limits, movies, genres }) => {
  const displayedMovies = limits ? movies.slice(0, limits) : movies;

  return (
    <>
      {displayedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </>
  );
};

export default MovieList;
