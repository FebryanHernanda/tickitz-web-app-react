import { useSelector } from "react-redux";
import { ComingSoonCard } from "../../molecules";
import { Loader2 } from "lucide-react";

const MoviesSoonList = ({ limits, movies }) => {
  const { genres } = useSelector((state) => state.movies);

  const moviesData = [...movies];

  const sortReleaseDate = moviesData.sort((a, b) => {
    const dateA = new Date(a.release_date);
    const dateB = new Date(b.release_date);
    return dateB - dateA;
  });

  const displayedMovies = limits
    ? sortReleaseDate.slice(0, limits)
    : sortReleaseDate;

  return (
    <>
      {displayedMovies.map((movie) => (
        <ComingSoonCard key={movie.id} movie={movie} genres={genres} />
      ))}
    </>
  );
};

export default MoviesSoonList;
