import { ArrowRight, Search } from "lucide-react";
import { MoviesList, Newslatters } from "../../organisms";

import heroBg from "/src/assets/background/background.png";

const MoviesPages = () => {
  return (
    <>
      <div className="">
        <section
          className="flex h-[700px] items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7)), url(${heroBg})`,
          }}
        >
          <div className="flex w-full max-w-screen-2xl flex-col gap-5 p-5 text-white lg:p-10">
            <h3 className="text-xl">LIST MOVIE OF THE WEEK</h3>
            <h1 className="text-5xl lg:text-7xl">
              Experience the Magic of Cinema: Book Your Tickets Today
            </h1>
          </div>
        </section>
        <div className="mx-auto max-w-screen-2xl px-5 pt-5 lg:px-10">
          {/* <!-- Container After Hero --> */}
          <div className="flex flex-col gap-10">
            {/* <!-- Exciting Movies --> */}
            <section className="flex flex-col gap-10">
              <div className="flex flex-wrap gap-10 lg:flex-row lg:flex-nowrap">
                <div className="flex w-full flex-col gap-5 lg:w-100">
                  <h3 className="text-xl font-semibold">Cari Event</h3>
                  <div className="relative flex items-center">
                    <Search className="absolute left-3 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full rounded-md border border-gray-300 p-2 pl-10 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <h3 className="text-xl font-semibold">Filter</h3>
                  <ul className="flex gap-10">
                    <li className="cursor-pointer rounded-lg p-2 hover:bg-blue-700 hover:text-white">
                      Thriller
                    </li>
                    <li className="cursor-pointer rounded-lg p-2 hover:bg-blue-700 hover:text-white">
                      Horror
                    </li>
                    <li className="cursor-pointer rounded-lg p-2 hover:bg-blue-700 hover:text-white">
                      Romantic
                    </li>
                    <li className="cursor-pointer rounded-lg p-2 hover:bg-blue-700 hover:text-white">
                      Sci-Fi
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex w-full flex-wrap justify-between gap-5">
                <MoviesList />
              </div>

              {/* <!-- Next list  --> */}
              <div className="flex items-center justify-center gap-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                  1
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200">
                  2
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200">
                  3
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-200">
                  4
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                  <ArrowRight />
                </div>
              </div>
              {/* <!-- Next List --> */}
            </section>

            <Newslatters />
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesPages;
