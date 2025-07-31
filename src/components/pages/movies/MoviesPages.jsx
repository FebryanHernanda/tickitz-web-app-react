import { ArrowRight } from "lucide-react";
import { MyButton } from "../../atoms";
import { InputField } from "../../molecules";
import { Footer, MoviesList, Navbar, Newslatters } from "../../organisms";
import MoviesDetailsPages from "./MoviesDetailsPages";

const MoviesPages = () => {
  return (
    <>
      <main className="">
        <div className="">
          {/* <!-- Hero --> */}
          <section
            className="flex h-[700px] items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.7)), url(../src/assets/background/background.png)",
            }}
          >
            <div className="flex w-full flex-col gap-5 p-5 text-white">
              <h3 className="text-xl">LIST MOVIE OF THE WEEK</h3>
              <h1 className="text-5xl">
                Experience the Magic of Cinema: Book Your Tickets Today
              </h1>
            </div>
          </section>
          {/* <!-- Hero --> */}

          {/* <!-- Container After Hero --> */}
          <div className="flex flex-col gap-10 p-5">
            {/* <!-- Exciting Movies --> */}
            <section className="flex flex-col gap-10">
              <div className="flex flex-wrap gap-10 lg:flex-row lg:flex-nowrap">
                <div className="flex w-full flex-col gap-5 lg:w-100">
                  <h3 className="font-regular text-secondary">Cari Event</h3>
                  <div className="search-component">
                    <InputField />
                  </div>
                </div>

                <div className="flex flex-col gap-7">
                  <h3 className="font-regular">Filter</h3>
                  <div className="search-list">
                    <ul className="flex gap-5">
                      <a href="#">
                        <li>Thriller</li>
                      </a>
                      <a href="#">
                        <li>Horror</li>
                      </a>
                      <a href="#">
                        <li>Romantic</li>
                      </a>
                      <a href="#">
                        <li>Sci-Fi</li>
                      </a>
                    </ul>
                  </div>
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
        <MoviesDetailsPages />
      </main>
    </>
  );
};

export default MoviesPages;
