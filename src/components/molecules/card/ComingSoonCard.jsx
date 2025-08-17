const ComingSoonCard = ({ movie, genres }) => {
  const findGenres = movie.genre_ids
    .map((id) => {
      const found = genres.find((genre) => genre.id === id);
      return found;
    })
    .slice(0, 3);

  /* Get Date Show */
  const moviesShowDate = new Date(movie.release_date);
  const getDate = moviesShowDate.toLocaleString("en-US", {
    month: "long",
  });
  const getYear = moviesShowDate.getFullYear();
  const release_date = `${getDate} ${getYear}`;

  return (
    <div className="relative min-w-75 overflow-hidden rounded-2xl">
      {/* Gambar Movie */}
      <div className="relative">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/640px-No-Image-Placeholder.svg.png"
          }
          alt={movie.title}
          className="h-[400px] w-full rounded-2xl border-1 border-gray-200 object-cover"
        />
      </div>
      {/* Deskripsi Movie */}
      <div className="flex h-[130px] flex-col justify-between px-2 py-4">
        <h2 className="font-semibold text-gray-800">{movie.title}</h2>
        <h4 className="-mt-2 font-semibold text-blue-700">{release_date}</h4>
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

export default ComingSoonCard;
