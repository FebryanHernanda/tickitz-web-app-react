const MovieCard = ({ movie, genres }) => {
  const findGenres = movie.genre_ids
    .map((id) => genres.find((genre) => genre.id === id))
    .slice(0, 3);

  return (
    <div className="w-[300px]">
      <div className="">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="rounded-2xl w-50"
        />
        <div className="card-overlay">
          <div className="button-overlay">
            <a href={`/pages/movies/detail-movies.html?id=${movie.id}`}>
              <button>Details</button>
            </a>
            <a href="/pages/payment/order.html">
              <button>Buy Tickets</button>
            </a>
          </div>
        </div>
      </div>

      <div className="movies-desc">
        <h3 className="text-large font-regular">{movie.title}</h3>
        <div className="flex gap-5">
          {findGenres.map((genre) => (
            <span key={genre.id} className="tags">
              {genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
