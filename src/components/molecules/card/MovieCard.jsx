const MovieCard = ({ movie, genres }) => {
  const findGenres = movie.genre_ids
    .map((id) => genres.find((genre) => genre.id === id))
    .slice(0, 3);

  return (
    <div className="w-full lg:w-[300px] overflow-hidden rounded-2xl relative">
      {/* Gambar Movie */}
      <div className="relative">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="rounded-2xl w-full h-[400px] object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center rounded-2xl group">
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition duration-300 rounded-2xl z-0"></div>

          <div className="flex flex-col gap-2 z-10 space-x-2 opacity-0 group-hover:opacity-100 transition duration-300">
            <a
              href={`/pages/movies/detail-movies.html?id=${movie.id}`}
              className="w-full"
            >
              <button className="bg-white w-full text-black px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition">
                Details
              </button>
            </a>
            <a href="/pages/payment/order.html">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
                Buy Tickets
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Deskripsi Movie */}
      <div className="py-4 px-2 flex flex-col justify-between h-[120px] ">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {movie.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {findGenres.map((genre) => (
            <span
              key={genre.id}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md"
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
