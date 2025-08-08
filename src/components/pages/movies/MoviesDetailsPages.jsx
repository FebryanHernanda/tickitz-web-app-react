import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { getCreditsMovies, getDetailsMovies } from "../../../data";

import ebvLogo from "/src/assets/icons/sponsor/ebv-logo.svg";
import cineOneLogo from "/src/assets/icons/sponsor/CineOne-logo.svg";
import hiflixLogo from "/src/assets/icons/sponsor/hiflix-logo.svg";
import { toast } from "react-toastify";

const MoviesDetailsPages = () => {
  /* Get movie id from url */
  const { movieId } = useParams();
  /* Navigate React Router */
  const navigate = useNavigate();

  /* state for get all data */
  const [details, setDetails] = useState([]);
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [time, setTime] = useState("");
  const [cinema, setCinema] = useState("");
  const [date, setDate] = useState("");

  /* Fetching data */
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const apiKey = import.meta.env.VITE_META_API_KEY;
        const [movieDetails, movieCredits] = await Promise.all([
          getDetailsMovies(apiKey, movieId),
          getCreditsMovies(apiKey, movieId),
        ]);
        setDetails(movieDetails);
        setCredits(movieCredits);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [movieId]);

  /* get Directore */
  const directorName = credits?.crew?.find((crew) => crew.job === "Director");

  /* get Cast */
  const cast = credits?.cast?.slice(0, 3);
  const artistName = cast?.map((artist) => artist.name).join(", ");

  /* Handle Order */
  const handleOrder = () => {
    if (!time || !date || !cinema) {
      toast.warning(
        "Please complete the Date, Time, and Cinema fields first.",
        {
          position: "top-center",
          autoClose: 3000,
        },
      );
      return;
    }
    /* Sent the data state to orderPages */
    navigate(`/order`, {
      state: {
        details,
        time,
        date,
        cinema,
      },
    });
  };

  return (
    <>
      {/* <!-- Hero Image --> */}
      <section
        className="flex h-[400px] w-full items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
        }}
      ></section>
      {/* <!-- Hero  Image--> */}

      {/* <!-- Movie Details Container --> */}
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 p-5 lg:p-10">
        <section>
          <div className="relative bottom-55 -mb-50 flex w-full flex-col items-center gap-10 md:bottom-35 md:-mb-30 md:flex-row lg:bottom-45 lg:-mb-35 xl:bottom-51 xl:-mb-45">
            <img
              src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
              alt="Poster Poster Movies"
              className="w-60 rounded-2xl shadow-lg md:w-70 lg:w-70"
            />

            <div className="flex w-full flex-col items-center gap-5 self-end md:items-start">
              <h1 className="text-center text-3xl md:text-left md:text-4xl">
                {details.title}
              </h1>
              {/* set Genres */}
              <div className="flex flex-wrap gap-2">
                {details?.genres?.map((data) => {
                  return (
                    <span
                      key={data.id}
                      className="rounded-md bg-gray-200 px-2 py-1 text-xs text-gray-700"
                    >
                      {data.name}
                    </span>
                  );
                })}
              </div>
              {/* set Genres */}

              {/* Details Movie */}
              <div className="flex h-full w-full gap-5">
                <div className="flex w-full flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-gray-400">Release Date</h4>
                    <h3 className="font-regular" id="releaseDate">
                      {new Date(details.release_date).toLocaleDateString(
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
                      {`${Math.floor(details.runtime / 60)} hours ${details.runtime % 60} minutes`}
                    </h3>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-gray-400">Directed by</h4>
                    <h3 className="font-regular" id="directorMovies">
                      {isLoading ? "Loading..." : directorName.name}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2 lg:w-90 xl:w-full">
                    <h4 className="text-gray-400">Casts</h4>
                    <h3 className="font-regular" id="castName">
                      {isLoading ? "Loading..." : artistName}
                    </h3>
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
              {details.overview}
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
                  <input
                    type="time"
                    className="w-full outline-none"
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-3 xl:w-80">
                <h2 className="font-light">Choose Location</h2>
                <div className="flex items-center rounded-lg border-2 border-gray-300 p-2">
                  <MapPin className="w-5" />
                  <select name="location" id="location" className="w-full pl-2">
                    <option value="jakarta">Jakarta</option>
                    <option value="bandung">Bandung</option>
                    <option value="surabaya">Surabaya</option>
                  </select>
                </div>
              </div>
              <div className="flex w-full items-end xl:w-40">
                <button
                  type="submit"
                  className="h-11 w-full items-end rounded-md bg-blue-700 p-2 text-white"
                >
                  Filter
                </button>
              </div>
            </div>
            {/* Input Container */}
          </div>

          {/* Choose Cinema container */}
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl">Choose Cinema</h1>
            <div className="payment-method-wrapper flex flex-wrap justify-between gap-5">
              <button
                type="button"
                onClick={() => setCinema("EBV")}
                className={`flex w-full flex-grow justify-center rounded-md border-1 border-gray-200 px-5 py-10 shadow ${cinema === "EBV" ? "group bg-blue-500 text-white" : "bg-white hover:bg-gray-100"} sm:w-40 lg:w-100 xl:w-50`}
              >
                <img
                  src={ebvLogo}
                  alt="EBV Icon"
                  className={`${cinema === "EBV" ? "group:filter brightness-0 invert saturate-100" : ""}`}
                />
              </button>
              <button
                type="button"
                className={`flex w-full flex-grow justify-center rounded-md border-1 border-gray-200 px-5 py-10 shadow ${cinema === "CineOne21" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"} sm:w-40 lg:w-100 xl:w-50`}
                onClick={() => setCinema("CineOne21")}
              >
                <img
                  src={cineOneLogo}
                  alt="CineOne21 Icon"
                  className={`${cinema === "CineOne21" ? "group:filter brightness-0 invert saturate-100" : ""}`}
                />
              </button>
              <button
                type="button"
                value="hiflix"
                className={`flex w-full flex-grow justify-center rounded-md border-1 border-gray-200 px-5 py-10 shadow ${cinema === "hiflix" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"} sm:w-40 lg:w-100 xl:w-50`}
                onClick={() => setCinema("hiflix")}
              >
                <img
                  src={hiflixLogo}
                  alt="hiflix Icon"
                  className={`${cinema === "hiflix" ? "group:filter brightness-0 invert saturate-100" : ""}`}
                />
              </button>
              <button
                type="button"
                className={`flex w-full flex-grow justify-center rounded-md border-1 border-gray-200 px-5 py-10 shadow ${cinema === "ebv" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"} sm:w-40 lg:w-100 xl:w-50`}
                onClick={() => setCinema("ebv")}
              >
                <img
                  src={ebvLogo}
                  alt="EBV Icon"
                  className={`${cinema === "ebv" ? "group:filter brightness-0 invert saturate-100" : ""}`}
                />
              </button>
            </div>
          </div>
          {/* Choose Cinema container */}

          {/* Pagination */}
          <div className="flex justify-center gap-5">
            <button
              type="button"
              className="flex h-5 w-5 items-center justify-center rounded-lg bg-blue-700 p-5 text-white"
            >
              1
            </button>
            <button
              type="button"
              className="flex h-5 w-5 items-center justify-center rounded-lg border-1 border-gray-300 p-5 hover:bg-blue-700 hover:text-white"
            >
              2
            </button>
            <button
              type="button"
              className="flex h-5 w-5 items-center justify-center rounded-lg border-1 border-gray-300 p-5 hover:bg-blue-700 hover:text-white"
            >
              3
            </button>
            <button
              type="button"
              className="flex h-5 w-5 items-center justify-center rounded-lg border-1 border-gray-300 p-5 hover:bg-blue-700 hover:text-white"
            >
              4
            </button>
            <button
              type="button"
              className="flex h-5 w-5 items-center justify-center rounded-lg border-1 border-gray-300 p-5 hover:bg-blue-700 hover:text-white"
            >
              5
            </button>
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
