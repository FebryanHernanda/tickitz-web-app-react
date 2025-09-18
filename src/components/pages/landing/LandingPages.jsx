import { ArrowLeft, ArrowRight, LucideCircleChevronRight } from "lucide-react";
import { MoviesList, MoviesSoonList, Newslatters } from "../../organisms";
import { Link } from "react-router-dom";

import shieldIcon from "/src/assets/icons/whychooseus/shield-icon.svg";
import checklistIcon from "/src/assets/icons/whychooseus/checklist-icon.svg";
import chatIcon from "/src/assets/icons/whychooseus/chat-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { IMG_BASE_URL } from "../../../utils/constants";
import { useEffect, useRef } from "react";
import {
  getPopularMovies,
  getUpcomingMovies,
} from "../../../store/slices/moviesSlice";

const LandingPages = () => {
  const dispatch = useDispatch();
  const { movies, upcomingMovies, popularMovies } = useSelector(
    (state) => state.movies,
  );

  /* Slider upcoming movies */
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };
  /* Slider upcoming movies */

  /* Check if state Data is null */
  // useEffect(() => {
  //   if (!movies.length || !genres.length || !upcomingMovies.length) {
  //     dispatch(fetchMoviesGenres());
  //     dispatch(fetchMovies({ page: 1 }));
  //     dispatch(fetchUpcomingMovies());
  //   }
  // }, [dispatch, movies.length, genres.length, upcomingMovies.length]);

  useEffect(() => {
    if (!popularMovies.length && !upcomingMovies.length) {
      dispatch(getPopularMovies());
      dispatch(getUpcomingMovies());
    }
  }, [dispatch, popularMovies.length, upcomingMovies.length]);

  const moviesPoster = {
    heroOne: movies?.[0]?.poster_path,
    heroTwo: movies?.[5]?.poster_path,
    heroThree: movies?.[10]?.poster_path,
    heroFourth: movies?.[15]?.poster_path,
  };

  return (
    <>
      {/* <!-- Container --> */}
      <div className="mx-auto mt-25 flex max-w-screen-2xl flex-col gap-30 px-5 lg:px-10">
        {/* <!-- Hero --> */}
        <section className="flex flex-wrap justify-center gap-10 lg:justify-between xl:flex-nowrap">
          <div className="flex flex-col justify-center gap-20 text-center xl:text-left">
            <h3 className="text-2xl text-blue-700">
              MOVIE TICKET PURCHASES #1 IN INDONESIA
            </h3>
            <h1 className="text-5xl font-semibold">
              Experience the Magic of Cinema: Book Your Tickets Today
            </h1>
            <h6 className="text-2xl">
              Sign up and get the ticket with a lot of discount
            </h6>
          </div>
          <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(80px,300px))] grid-rows-[200px_200px_200px] place-content-center gap-2 p-5">
            <img
              className="col-start-1 row-start-1 row-end-2 h-full w-full rounded-t-2xl object-cover"
              src={`${IMG_BASE_URL}/w500${moviesPoster.heroOne}`}
              alt="Movies Poster"
            />
            <img
              className="col-start-2 col-end-3 row-start-1 row-end-3 h-full w-full rounded-t-2xl object-cover"
              src={`${IMG_BASE_URL}/w500${moviesPoster.heroTwo}`}
              alt="Movies Poster"
            />
            <img
              className="col-start-1 row-start-2 row-end-4 h-full w-full items-end rounded-b-2xl object-cover"
              src={`${IMG_BASE_URL}/w500${moviesPoster.heroThree}`}
              alt="Movies Poster"
            />
            <img
              className="col-start-2 row-start-3 row-end-4 h-full w-full rounded-b-2xl object-cover"
              src={`${IMG_BASE_URL}/w500${moviesPoster.heroFourth}`}
              alt="Movies Poster"
            />
          </div>
        </section>
        {/* <!-- Hero --> */}

        {/* <!-- Why Choose Use Section --> */}
        <section className="flex flex-col gap-20">
          <div className="flex flex-col justify-between gap-10 text-center lg:text-left">
            <h3 className="text-2xl text-blue-700">WHY CHOOSE US</h3>
            <h1 className="text-5xl font-semibold">
              Unleashing the Ultimate Movie Experience
            </h1>
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row">
            {/* <!-- Card1 --> */}
            <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <div className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-200">
                <img src={shieldIcon} alt="Shield Icon" />
              </div>
              <h6 className="font-bold">Guaranteed</h6>
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ad
                iste voluptatem rerum nam nisi iusto fugit sint beatae aut.
              </p>
            </div>
            {/* <!-- Card 2  --> */}
            <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <div className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-200">
                <img src={checklistIcon} alt="Shield Icon" />
              </div>
              <h6 className="font-bold">Affordable</h6>
              <p className="text-small font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ad
                iste voluptatem rerum nam nisi iusto fugit sint beatae aut.
              </p>
            </div>
            {/* <!-- Card 3 --> */}
            <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <div className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-200">
                <img src={chatIcon} alt="Shield Icon" />
              </div>
              <h6 className="font-bold">24/7 Customer Support</h6>
              <p className="text-small font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ad
                iste voluptatem rerum nam nisi iusto fugit sint beatae aut.
              </p>
            </div>
          </div>
        </section>
        {/* <!-- Why Choose Us Section --> */}

        {/* <!-- Exciting Movies --> */}
        <section className="flex flex-col items-center justify-center gap-10">
          <div className="flex w-full flex-col gap-20">
            <div className="flex flex-col gap-10 text-center">
              <h3 className="text-2xl text-blue-700">MOVIES</h3>
              <h1 className="text-5xl font-semibold">
                Exciting Movies That Should Be Watched Today
              </h1>
            </div>

            <div className="w-full overflow-x-scroll">
              <div className="flex w-[1200px] gap-5 md:w-full md:flex-wrap md:justify-between lg:justify-center lg:gap-10 xl:justify-between">
                <MoviesList limits={4} movies={popularMovies} />
              </div>
            </div>
          </div>

          {/* <!-- Button --> */}
          <Link to="/movies">
            <div className="flex gap-3">
              <h3 className="text-blue font-regular">View All</h3>
              <LucideCircleChevronRight
                name="ChevronRight"
                className="h-6 w-6"
              />
            </div>
          </Link>
          {/* <!-- Button --> */}
        </section>
        {/* <!-- Exciting Movies --> */}

        {/* <!-- Upcoming Movies --> */}
        <section className="flex flex-col gap-15">
          <div className="flex items-end justify-between gap-5">
            <div className="flex w-full flex-col gap-10 text-center lg:text-left">
              <h3 className="text-2xl text-blue-700">UPCOMING MOVIES</h3>
              <h1 className="text-5xl font-semibold">
                Exciting Movie Coming Soon
              </h1>
            </div>
            <div className="hidden gap-5 lg:flex">
              <button
                className="flex h-15 w-15 items-center justify-center rounded-full bg-gray-400 text-white hover:bg-blue-700"
                onClick={() => scroll("left")}
              >
                <ArrowLeft size={30} />
              </button>
              <button
                className="flex h-15 w-15 items-center justify-center rounded-full bg-gray-400 text-white hover:bg-blue-700"
                onClick={() => scroll("right")}
              >
                <ArrowRight size={30} />
              </button>
            </div>
          </div>
          <div
            ref={sliderRef}
            className="scrollbar-hide flex snap-x snap-mandatory justify-between gap-20 overflow-x-scroll scroll-smooth p-4"
          >
            <MoviesSoonList limits={10} movies={upcomingMovies} />
          </div>
        </section>
        {/* <!-- Upcoming Movies --> */}

        {/* <!-- Newslatters --> */}
        <Newslatters />
      </div>
    </>
  );
};

export default LandingPages;
