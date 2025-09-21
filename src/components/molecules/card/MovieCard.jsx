import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../utils/constants";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  // const findGenres = movie.genre_ids
  //   .map((id) => {
  //     const found = genres.find((genre) => genre.id === id);
  //     return found;
  //   })
  //   .slice(0, 3);

  const handleDetails = () => {
    navigate(`/movies/details/${movie.id}`);
  };

  return (
    <div className="flex h-fit w-full flex-col gap-5 rounded-2xl sm:w-75 lg:w-[300px]">
      {/* Movie Pictures */}
      <div className="relative">
        <img
          src={
            movie.poster_path
              ? `${API_URL}/public/movies${movie.poster_path}`
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png"
          }
          alt={movie.title}
          className="h-[400px] w-full rounded-2xl border-1 border-gray-200 object-cover"
        />

        {movie.vote_average >= 7.5 && (
          <span className="absolute top-7 left-0 rounded-r-xl bg-blue-700 px-3 py-1 text-xs font-semibold text-white shadow-2xl">
            Recommended
          </span>
        )}

        <div className="group absolute inset-0 flex items-center justify-center rounded-2xl">
          {/* Overlay hitam */}
          <div className="absolute inset-0 z-0 rounded-2xl bg-black opacity-0 transition duration-300 md:opacity-0 lg:group-hover:opacity-70"></div>

          {/* Tombol */}
          <div className="z-10 hidden flex-col gap-2 opacity-100 transition duration-300 lg:flex lg:opacity-0 lg:group-hover:opacity-100">
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

      {/* Movie Description */}
      <div className="flex flex-col justify-between gap-5 px-2 pt-1 lg:h-fit">
        <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
        <div className="flex flex-wrap gap-2">
          {/* {findGenres &&
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
              ))} */}
          {movie.genres.map((item, id) => {
            return (
              <span
                key={id}
                className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700"
              >
                {item}
              </span>
            );
          })}
        </div>

        <div className="flex gap-2 lg:hidden">
          <button
            className="w-30 rounded-md border-1 border-blue-600 py-1 text-sm text-blue-700 transition hover:bg-blue-700 hover:text-white"
            onClick={handleDetails}
          >
            Details
          </button>
          <button className="w-30 rounded-md bg-blue-600 py-1 text-sm text-white transition hover:bg-blue-700">
            Buy Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
