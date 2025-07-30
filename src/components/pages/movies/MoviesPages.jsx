import { MyButton } from "../../atoms";
import { InputField } from "../../molecules";
import { MoviesList } from "../../organisms";

const MoviesPages = () => {
  return (
    <div className="p-5">
      <header className="flex justify-between items-center">
        <img
          src="/src/assets/icons/logo/tickitz-logo-blue.svg"
          alt="Tickitz Logo"
        />
        <nav>
          <ul className="flex gap-5">
            <a href="#">
              <li>Home</li>
            </a>
            <a href="#">
              <li>Movie</li>
            </a>
            <a href="#">
              <li>Buy Ticket</li>
            </a>
          </ul>
        </nav>

        <div className="flex gap-5">
          <MyButton>Sign In</MyButton>
          <MyButton>Sign Up</MyButton>
        </div>
      </header>

      <main>
        {/* <!-- Hero --> */}
        <section className="hero-listmovies">
          <div className="hero-wrapper text-white container">
            <h3 className="font-regular">LIST MOVIE OF THE WEEK</h3>
            <h1 className="title-extra-large font-regular">
              Experience the Magic of Cinema: Book Your Tickets Today
            </h1>
            <div className="shape-next">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </section>
        {/* <!-- Hero --> */}

        {/* <!-- Container After Hero --> */}
        <div className="">
          {/* <!-- Exciting Movies --> */}
          <section className="exciting-movies">
            <div className="search-menu-listmovies">
              <div className="search-event">
                <h3 className="font-regular text-secondary">Cari Event</h3>
                <div className="search-component">
                  <InputField />
                </div>
              </div>

              <div className="flex gap-1 flex-col">
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

            <div className="flex flex-wrap gap-5">
              <MoviesList />
            </div>

            {/* <!-- Next list  --> */}
            <div className="flex  items-center justify-center gap-5">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                1
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center">
                2
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center">
                3
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center">
                4
              </div>
            </div>
            {/* <!-- Next List --> */}
          </section>
        </div>
      </main>
    </div>
  );
};

export default MoviesPages;
