import { LucideCircleChevronRight } from "lucide-react";
import { MoviesList, Newslatters } from "../../organisms";
import { Link } from "react-router-dom";

const LandingPages = () => {
  return (
    <>
      {/* <!-- Container --> */}
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-10 p-5 lg:p-10">
        {/* <!-- Hero --> */}
        <section className="flex flex-wrap justify-center gap-10 lg:flex-nowrap lg:justify-between">
          <div className="flex flex-col justify-center gap-10 text-center lg:text-left">
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
          <div className="grid grid-cols-2 gap-2">
            <img
              className="col-start-1 row-start-1"
              src="src/assets/background/hero/hero-1.svg"
              alt="John Wick Movie Poster "
            />
            <img
              className="col-start-2 row-start-1"
              src="src/assets/background/hero/hero-2.svg"
              alt="Lion King Movie poster"
            />
            <div className="relative">
              <img
                className="absolute bottom-0 col-start-1 row-start-2 lg:bottom-4 xl:bottom-0"
                src="src/assets/background/hero/hero-3.svg"
                alt="Spiderman Movie Poster"
              />
            </div>
            <img
              className="col-start-2 row-start-2 lg:-mt-4 xl:-mt-0"
              src="src/assets/background/hero/hero-4.svg"
              alt="Roblox Movie Poster"
            />
          </div>
        </section>
        {/* <!-- Hero --> */}

        {/* <!-- Why Choose Use Section --> */}
        <section className="flex flex-col gap-10">
          <div className="flex flex-col justify-center gap-5 text-center lg:text-left">
            <h3 className="text-2xl text-blue-700">WHY CHOOSE US</h3>
            <h1 className="text-5xl font-semibold">
              Unleashing the Ultimate Movie Experience
            </h1>
          </div>

          <div className="flex flex-col justify-between gap-5 lg:flex-row">
            {/* <!-- Card1 --> */}
            <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <div className="flex h-13 w-13 items-center justify-center rounded-full bg-blue-200">
                <img
                  src="src/assets/icons/whychooseus/shield-icon.svg"
                  alt="Shield Icon"
                />
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
                <img
                  src="src/assets/icons/whychooseus/checklist-icon.svg"
                  alt="Shield Icon"
                />
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
                <img
                  src="src/assets/icons/whychooseus/chat-icon.svg"
                  alt="Shield Icon"
                />
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
          <div className="title-wrapper text-center">
            <h3 className="text-2xl text-blue-700">MOVIES</h3>
            <h1 className="text-5xl font-semibold">
              Exciting Movies That Should Be Watched Today
            </h1>
          </div>

          <div className="w-full overflow-x-scroll md:overflow-x-auto">
            <div className="flex w-[1200px] gap-5 md:w-full md:flex-wrap md:justify-between">
              <MoviesList limits="4" />
            </div>
          </div>

          {/* <!-- Button --> */}
          {/* <a href="/pages/landing/listmovies.html"> */}
          <Link to="/movies">
            <div className="flex gap-3">
              <h3 className="text-blue font-regular">View All</h3>
              <LucideCircleChevronRight
                name="ChevronRight"
                className="h-6 w-6"
              />
            </div>
          </Link>
          {/* </a> */}
          {/* <!-- Button --> */}
        </section>
        {/* <!-- Exciting Movies --> */}

        {/* <!-- Upcoming Movies --> */}
        <section className="flex flex-col gap-10">
          <div className="text-center">
            <h3 className="text-2xl text-blue-700">UPCOMING MOVIES</h3>
            <div className="wrapper-upcoming">
              <h1 className="text-5xl font-semibold">
                Exciting Movie Coming Soon
              </h1>
              <div className="next-button">
                <div className="circle">
                  <i className="fa-solid fa-arrow-left fa-lg"></i>
                </div>
                <div className="circle blue">
                  <i className="fa-solid fa-arrow-right fa-lg"></i>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full overflow-x-scroll md:overflow-x-auto">
            <div className="flex w-[1200px] gap-5 md:w-full md:flex-wrap md:justify-between">
              <MoviesList limits="4" />
            </div>
          </div>

          <Newslatters />
        </section>
        {/* <!-- Upcoming Movies --> */}

        {/* <!-- Newslatters --> */}
      </div>
    </>
  );
};

export default LandingPages;
