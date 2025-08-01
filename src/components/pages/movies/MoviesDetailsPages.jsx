import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapPin } from "lucide-react";
import { getCreditsMovies, getDetailsMovies } from "../../../data";
import { Circle } from "../../atoms";

const MoviesDetailsPages = () => {
  const { movieId } = useParams();

  const [details, setDetails] = useState([]);
  const [credits, setCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const directorName = credits?.crew?.find((crew) => crew.job === "Director");

  const cast = credits?.cast?.slice(0, 3);
  const artistName = cast?.map((artist) => artist.name).join(", ");

  return (
    <>
      {/* <!-- Hero --> */}
      <section
        className="flex h-[400px] w-full items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7)), url(https://image.tmdb.org/t/p/original${details.backdrop_path})`,
        }}
      ></section>

      {/* <!-- Movie Details --> */}
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
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="text-2xl">Synopsis</h3>
            <p className="text-justify text-lg text-gray-500">
              {details.overview}
            </p>
          </div>
        </section>
        {/* <!-- Movie Details --> */}
        {/* <!-- Book Section --> */}
        <section className="flex flex-col gap-15">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl">Book Tickets</h1>
            <div className="flex flex-wrap justify-between gap-5">
              <div className="flex w-full flex-col gap-3 xl:w-80">
                <h2 className="font-light">Choose Date</h2>
                <div className="flex items-center justify-between rounded-lg border-2 border-gray-300 p-2">
                  <input
                    type="date"
                    className="w-full outline-none"
                    placeholder="21/07/2025"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-3 xl:w-80">
                <h2 className="font-light">Choose Time</h2>
                <div className="flex items-center justify-between rounded-lg border-2 border-gray-300 p-2">
                  <input
                    type="time"
                    className="w-full outline-none"
                    placeholder="08:30 AM"
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
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-3xl">Choose Cinema</h1>
            <div className="payment-method-wrapper flex flex-wrap justify-between gap-5">
              <button
                type="button"
                value="EBV"
                className="flex w-full flex-grow justify-center rounded-md border-1 border-gray-200 bg-white px-5 py-10 shadow hover:bg-gray-100 sm:w-40 lg:w-100 xl:w-50"
              >
                <img
                  src="/src/assets/icons/sponsor/ebv-logo.svg"
                  alt="EBV Icon"
                />
              </button>
              <button
                type="button"
                value="CineOne21"
                className="flex w-full flex-grow justify-center rounded-md border-1 border-gray-200 bg-white px-5 py-10 shadow hover:bg-gray-100 sm:w-40 lg:w-100 xl:w-50"
              >
                <img
                  src="/src/assets/icons/sponsor/CineOne-logo.svg"
                  alt="CineOne21 Icon"
                />
              </button>
              <button
                type="button"
                value="hiflix"
                className="flex w-full flex-grow justify-center rounded-md border-1 border-gray-200 bg-white px-5 py-10 shadow hover:bg-gray-100 sm:w-40 lg:w-100 xl:w-50"
              >
                <img
                  src="/src/assets/icons/sponsor/hiflix-logo.svg"
                  alt="hiflix Icon"
                />
              </button>
              <button
                type="button"
                value="EBV"
                className="flex w-full flex-grow justify-center rounded-md border-1 border-gray-200 bg-white px-5 py-10 shadow hover:bg-gray-100 sm:w-40 lg:w-100 xl:w-50"
              >
                <img
                  src="/src/assets/icons/sponsor/ebv-logo.svg"
                  alt="EBV Icon"
                />
              </button>
            </div>
          </div>

          <div class="flex justify-center gap-5">
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
          <div class="flex justify-center">
            <button
              type="submit"
              className="h-11 items-end rounded-md bg-blue-700 p-2 px-20 text-white"
            >
              Book Now
            </button>
          </div>
        </section>
        {/* <!-- Book Section --> */}
      </div>
    </>
  );
};

export default MoviesDetailsPages;
