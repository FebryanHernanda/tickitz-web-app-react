import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesDetails } from "../../../store/slices/moviesSlice";
import { getCinemaSchedule } from "../../../store/slices/cinemaSlice";
import getCinemaLogo from "../../../data/cinema/getCinemaLogo";
import { API_URL } from "../../../utils/constants";

const MoviesDetailsPages = () => {
  const dispatch = useDispatch();

  const { moviesDetails, loading } = useSelector((state) => state.movies);
  const { data, total_pages, isLoading, error } = useSelector(
    (state) => state.cinema,
  );

  /* Get movie id from url */
  const { movieId } = useParams();
  /* Navigate React Router */
  const navigate = useNavigate();

  // // const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [selectedCinema, setSelectedCinema] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getMoviesDetails(movieId));
  }, [dispatch, movieId]);
  const artistName = (moviesDetails?.casts || []).join(", ");

  useEffect(() => {
    dispatch(getCinemaSchedule({ movieId, location, date, time }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleFilter = () => {
    dispatch(getCinemaSchedule({ movieId, location, date, time, page }));
  };

  /* Selected Card Cinema Schedule */
  const selectedCardSchedule = (idx) => {
    if (selectedCinema === idx) {
      setSelectedCinema(null);
    } else {
      setSelectedCinema(idx);
    }
  };

  const handlePagination = (newPage) => {
    if (newPage < 1 || newPage > total_pages) return;
    setPage(newPage);
    dispatch(getCinemaSchedule({ page: newPage }));
  };

  /* Handle Order */
  const handleOrder = () => {
    if (!selectedCinema) {
      toast.warning("Please Choose your cinema !", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    /* Sent the data state to orderPages */
    navigate(`/order`, {
      state: {
        moviesDetails,
        time,
        date,
        selectedCinema,
      },
    });
  };

  return (
    <>
      {/* <!-- Hero Image --> */}
      <section
        className="flex h-[530px] w-full items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7)), url(${API_URL}/public/movies${moviesDetails.backdrop_path})`,
        }}
      ></section>
      {/* <!-- Hero  Image--> */}

      {/* <!-- Movie Details Container --> */}
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 p-5 lg:p-10">
        <section>
          <div className="relative bottom-55 -mb-50 flex w-full flex-col items-center gap-10 md:bottom-35 md:-mb-30 md:flex-row lg:bottom-45 lg:-mb-35 xl:bottom-51 xl:-mb-45">
            <img
              src={`${API_URL}/public/movies${moviesDetails.poster_path}`}
              alt="Poster Poster Movies"
              className="w-60 rounded-2xl shadow-lg md:w-70 lg:w-70"
            />

            <div className="flex w-full flex-col items-center gap-5 self-end md:items-start">
              <h1 className="text-center text-3xl md:text-left md:text-4xl">
                {moviesDetails.title}
              </h1>
              {/* set Genres */}
              <div className="flex flex-wrap gap-2">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  moviesDetails?.genres?.map((data, id) => (
                    <span
                      key={id}
                      className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700"
                    >
                      {data}
                    </span>
                  ))
                )}
              </div>
              {/* set Genres */}

              {/* Details Movie */}
              <div className="flex h-full w-full gap-5">
                <div className="flex w-full flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-gray-400">Release Date</h4>
                    <h3 className="font-regular" id="releaseDate">
                      {new Date(moviesDetails.release_date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        },
                      )}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-gray-400">Duration</h4>
                    <h3 className="font-regular" id="durationMovies">
                      {`${Math.floor(moviesDetails.duration / 60)} hours ${moviesDetails.duration % 60} minutes`}
                    </h3>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-gray-400">Directed by</h4>
                    <h3 className="font-regular" id="directorMovies">
                      {moviesDetails.director}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2 lg:w-90 xl:w-full">
                    <h4 className="text-gray-400">Casts</h4>
                    {loading ? "Loading..." : artistName}
                  </div>
                </div>
              </div>
              {/* Details Movie */}
            </div>
          </div>

          {/* Movies Overview */}
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl">Synopsis</h3>
            <p className="text-justify text-lg text-gray-500">
              {moviesDetails.synopsis}
            </p>
          </div>
          {/* Movies Overview */}
        </section>
        {/* <!-- Movie Details --> */}
        {/* <!-- Book Section --> */}
        <section className="flex flex-col gap-15">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl">Book Tickets</h1>
            {/* Input Container */}
            <div className="flex flex-wrap justify-between gap-5">
              <div className="flex w-full flex-col gap-3 xl:w-80">
                <h2 className="font-light">Choose Date</h2>
                <div className="flex items-center justify-between rounded-lg border-2 border-gray-300 p-2">
                  <input
                    type="date"
                    className="w-full outline-none"
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-3 xl:w-80">
                <h2 className="font-light">Choose Time</h2>
                <div className="flex items-center justify-between rounded-lg border-2 border-gray-300 p-2">
                  <select
                    name="time"
                    id="time"
                    className="w-full outline-none"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  >
                    <option value="">-- Select Time --</option>
                    <option value="10:00">10:00</option>
                    <option value="13:00">13:00</option>
                    <option value="16:00">16:00</option>
                    <option value="19:00">19:00</option>
                    <option value="22:00">22:00</option>
                  </select>
                </div>
              </div>
              <div className="flex w-full flex-col gap-3 xl:w-80">
                <h2 className="font-light">Choose Location</h2>
                <div className="flex items-center rounded-lg border-2 border-gray-300 p-2">
                  <MapPin className="w-5" />
                  <select
                    name="location"
                    id="location"
                    className="h-full w-full border-0 pl-2"
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">-- Select Location --</option>
                    <option value="Jakarta">Jakarta</option>
                    <option value="Bandung">Bandung</option>
                  </select>
                </div>
              </div>
              <div className="flex w-full items-end xl:w-40">
                <button
                  type="submit"
                  className="h-11 w-full items-end rounded-md bg-blue-700 p-2 text-white"
                  onClick={handleFilter}
                >
                  Filter
                </button>
              </div>
            </div>
            {/* Input Container */}
          </div>

          {/* Choose Cinema Card container */}
          <div className="flex flex-row justify-center gap-5">
            {isLoading ? (
              <p className="py-6 text-center text-gray-500">
                Loading jadwal...
              </p>
            ) : error ? (
              <p className="text-black-500 py-6 text-center">
                {error || "Tidak ada jadwal tersedia"}
              </p>
            ) : (
              data.map((show, idx) => (
                <div
                  key={idx}
                  className={`flex cursor-pointer overflow-hidden rounded-xl border ${
                    selectedCinema?.CinemaScheduleID === show.CinemaScheduleID
                      ? "border-indigo-600 bg-indigo-50 shadow-lg"
                      : "border-gray-200 bg-white shadow-md"
                  }`}
                  onClick={() => selectedCardSchedule(show)}
                >
                  <div className="w-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                    {/* Logo */}
                    <div className="mb-4 flex justify-center">
                      <img
                        src={getCinemaLogo(show.CinemaName)}
                        alt={`${show.CinemaName} Logo`}
                        className="w-50 object-contain"
                      />
                    </div>

                    {/* Konten utama */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                      {/* Info cinema + movie */}
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900">
                          {show.CinemaName}
                        </h2>
                        <p className="text-gray-600">{show.LocationName}</p>

                        <h3 className="mt-3 text-lg font-semibold text-indigo-700">
                          {show.MovieName}
                        </h3>
                      </div>

                      {/* Info jadwal */}
                      <div className="flex flex-col gap-1 text-gray-700">
                        <p className="font-medium">
                          Date:{" "}
                          <time dateTime={show.ScheduleDate}>
                            {new Date(show.ScheduleDate).toLocaleDateString(
                              "en-GB",
                            )}
                          </time>
                        </p>
                        <p className="font-medium">
                          Time: {show.ScheduleTime} WIB
                        </p>
                      </div>

                      {/* Harga */}
                      <div className="text-xl font-bold text-blue-800">
                        Rp {show.TicketPrice.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Choose Cinema Card container */}

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {/* Page Numbers */}
            {Array.from({ length: total_pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => handlePagination(p)}
                className={`flex h-8 w-8 items-center justify-center rounded ${
                  p === page
                    ? "bg-blue-600 text-white shadow-md"
                    : "border border-gray-300 text-gray-700"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          {/* Pagination */}

          {/* Button Book */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="h-11 items-end rounded-md bg-blue-700 p-2 px-20 text-white"
              onClick={handleOrder}
            >
              Book Now
            </button>
          </div>
          {/* Button Book */}
        </section>
        {/* <!-- Book Section --> */}
      </div>
      {/* <!-- Movie Details Container --> */}
    </>
  );
};

export default MoviesDetailsPages;
