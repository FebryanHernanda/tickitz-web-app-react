import { MovieCard } from "../../molecules";

const MovieList = ({ limits, movies, genres, loading }) => {
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
