import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie, genres }) => {
  const navigate = useNavigate();

  const findGenres = movie.genre_ids
    .map((id) => {
      const found = genres.find((genre) => genre.id === id);
      return found;
    })
    .slice(0, 5);

  const handleDetails = () => {
    navigate(`/movies/details/${movie.id}`);
  };

  return (
    <div className="relative w-75 overflow-hidden rounded-2xl lg:w-[300px]">
      {/* Gambar Movie */}
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
          alt={movie.title}
          className="h-[400px] w-full rounded-2xl border-1 border-gray-200 object-cover"
        />

        <div className="group absolute inset-0 flex items-center justify-center rounded-2xl">
          <div className="absolute inset-0 z-0 rounded-2xl bg-black opacity-0 transition duration-300 group-hover:opacity-70"></div>

          <div className="z-10 flex flex-col gap-2 space-x-2 opacity-0 transition duration-300 group-hover:opacity-100">
            <button
              className="w-full rounded-md bg-white px-4 py-2 text-sm text-black transition hover:bg-gray-200"
              onClick={handleDetails}
            >
              Details
            </button>
            <button className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700">
              Buy Tickets
            </button>
          </div>
        </div>
      </div>

      {/* Deskripsi Movie */}
      <div className="flex h-[120px] flex-col justify-between px-2 py-4">
        <h3 className="mb-2 text-lg font-semibold text-gray-800">
          {movie.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {findGenres &&
            findGenres.length > 0 &&
            findGenres
              .filter((genre) => genre && genre.name)
              .map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700"
                >
                  {genre.name}
                </span>
              ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
