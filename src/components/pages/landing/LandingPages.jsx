import { LucideCircleChevronRight } from "lucide-react";
import { MoviesList, Newslatters } from "../../organisms";
import { Link } from "react-router-dom";

const LandingPages = () => {
  return (
    <>
      {/* <!-- Container --> */}
      <div className="flex flex-col p-5 lg:p-10 gap-10">
        {/* <!-- Hero --> */}
        <section className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-between gap-10">
          <div className="flex flex-col justify-center text-center lg:text-left gap-5">
            <h3 className="text-blue-700 text-2xl">
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
                className="col-start-1 row-start-2 absolute bottom-0 lg:bottom-4 xl:bottom-0 "
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
        <section className="flex flex-col gap-10 ">
          <div className="flex flex-col justify-center text-center lg:text-left gap-5">
            <h3 className="text-blue-700 text-2xl">WHY CHOOSE US</h3>
            <h1 className="text-5xl font-semibold">
              Unleashing the Ultimate Movie Experience
            </h1>
          </div>

          <div className="flex flex-col gap-5 lg:flex-row justify-between ">
            {/* <!-- Card1 --> */}
            <div className="flex flex-col gap-3 text-center items-center lg:text-left lg:items-start">
              <div className="w-13 h-13 rounded-full flex items-center justify-center bg-blue-200">
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
            <div className="flex flex-col gap-3 text-center items-center lg:text-left lg:items-start">
              <div className="w-13 h-13 rounded-full flex items-center justify-center bg-blue-200">
                <img
                  src="src/assets/icons/whychooseus/checklist-icon.svg"
                  alt="Shield Icon"
                />
              </div>
              <h6 className="font-bold">Affordable</h6>
              <p className="font-light text-small">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ad
                iste voluptatem rerum nam nisi iusto fugit sint beatae aut.
              </p>
            </div>
            {/* <!-- Card 3 --> */}
            <div className="flex flex-col gap-3 text-center items-center lg:text-left lg:items-start">
              <div className="w-13 h-13 rounded-full flex items-center justify-center bg-blue-200">
                <img
                  src="src/assets/icons/whychooseus/chat-icon.svg"
                  alt="Shield Icon"
                />
              </div>
              <h6 className="font-bold">24/7 Customer Support</h6>
              <p className="font-light text-small">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ad
                iste voluptatem rerum nam nisi iusto fugit sint beatae aut.
              </p>
            </div>
          </div>
        </section>
        {/* <!-- Why Choose Us Section --> */}

        {/* <!-- Exciting Movies --> */}
        <section className="flex items-center justify-center flex-col gap-10">
          <div className="title-wrapper text-center">
            <h3 className="text-blue-700 text-2xl">MOVIES</h3>
            <h1 className="text-5xl font-semibold">
              Exciting Movies That Should Be Watched Today
            </h1>
          </div>

          <div className="overflow-x-scroll md:overflow-x-auto w-full">
            <div className="flex gap-5 w-[1200px] md:w-full md:justify-between md:flex-wrap ">
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
            <h3 className="text-blue-700 text-2xl">UPCOMING MOVIES</h3>
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

          <div className="overflow-x-scroll md:overflow-x-auto w-full">
            <div className="flex gap-5 w-[1200px] md:w-full md:justify-between md:flex-wrap ">
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
