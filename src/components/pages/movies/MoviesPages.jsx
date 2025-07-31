import { ArrowRight } from "lucide-react";
import { MyButton } from "../../atoms";
import { InputField } from "../../molecules";
import { Footer, MoviesList, Navbar, Newslatters } from "../../organisms";

const MoviesPages = () => {
  return (
    <>
      <main className="">
        <div className="">
          {/* <!-- Hero --> */}
          <section
            className="bg-cover bg-center bg-no-repeat h-[700px] flex justify-center items-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 0, 0, 0.7)), url(src/assets/background/background.png)",
            }}
          >
            <div className="flex text-white flex-col gap-5 p-5 w-full">
              <h3 className="text-xl">LIST MOVIE OF THE WEEK</h3>
              <h1 className="text-5xl">
                Experience the Magic of Cinema: Book Your Tickets Today
              </h1>
            </div>
          </section>
          {/* <!-- Hero --> */}

          {/* <!-- Container After Hero --> */}
          <div className="p-5 flex flex-col gap-10">
            {/* <!-- Exciting Movies --> */}
            <section className="flex flex-col gap-10">
              <div className="flex gap-10 flex-wrap lg:flex-nowrap lg:flex-row">
                <div className="flex flex-col gap-5 w-full lg:w-100">
                  <h3 className="font-regular text-secondary">Cari Event</h3>
                  <div className="search-component">
                    <InputField />
                  </div>
                </div>

                <div className="flex gap-7 flex-col">
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

              <div className="flex flex-wrap gap-5 justify-between w-full">
                <MoviesList />
              </div>

              {/* <!-- Next list  --> */}
              <div className="flex  items-center justify-center gap-5">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  1
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center ">
                  2
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                  3
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                  4
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <ArrowRight />
                </div>
              </div>
              {/* <!-- Next List --> */}
            </section>

            <Newslatters />
          </div>
        </div>
      </main>
    </>
  );
};

export default MoviesPages;
