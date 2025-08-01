import { ChooseSeat } from "../../organisms";

const OrderPages = () => {
  return (
    <section className="flex flex-col items-center gap-10 bg-gray-200 p-5 lg:p-10">
      <div className="flex flex-col justify-between gap-10 lg:flex-row">
        {/* <!-- Book Seat Section --> */}
        <section className="flex w-full flex-col gap-10 rounded-2xl bg-white p-5 lg:w-250">
          {/* <!-- Card Movies --> */}
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border-1 border-gray-200 p-3 sm:flex-row lg:h-40">
            <div className="h-40 w-full lg:h-full lg:w-200">
              <img
                src="/public/spiderman.svg"
                alt="Movies Posters"
                className="h-full w-full rounded-md object-cover object-top"
              />
            </div>
            <div className="flex w-full flex-col gap-5">
              <h3 className="font-regular text-xl">Spider-Man: Homecoming</h3>
              <div className="flex gap-2">
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium">
                  Action
                </span>
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm font-medium">
                  Sci-Fi
                </span>
              </div>
              <div className="card-movies-bottom">
                <h4 className="text-medium font-regular">Regular - 13:00 PM</h4>
              </div>
            </div>
            <div className="h-full w-full sm:place-content-end md:w-80">
              <button className="w-full rounded-xl bg-blue-700 p-2 text-white">
                Change
              </button>
            </div>
          </div>
          {/* <!-- Card Movies --> */}

          <h1 className="text-2xl font-semibold">Choose Your Seat</h1>

          {/* <!-- Choose Seat --> */}
          {/* <ChooseSeat /> */}
          {/* <!-- Choose Seat --> */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold">Seating Key</h3>
            <div className="flex flex-wrap items-center justify-center gap-5 p-5 text-sm lg:justify-around">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-md border border-gray-300 bg-white" />
                <span>Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-md bg-blue-600" />
                <span>Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-md bg-pink-600" />
                <span>Love Nest</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-md bg-gray-500" />
                <span>Sold</span>
              </div>
            </div>
          </div>
        </section>

        {/* <!-- Book Seat Section --> */}
        <section className="flex flex-col gap-5">
          <div className="rounded-2xl bg-white p-5 lg:w-100">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="../src/assets/icons/sponsor/CineOne-logo.svg"
                    alt="CineOne21 Logo"
                    className="w-50"
                  />
                  <h1 className="text-3xl">CineOne21 Cinema</h1>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-gray-500">Movie selected</h3>
                  <h3 className="font-regular">Spider-Man: Homecoming</h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-gray-500">Tuesday, 07 July 2020</h3>
                  <h3 className="">13:00 PM</h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-gray-500">One ticket price</h3>
                  <h3 className="font-regular">$10</h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-gray-500">Seat Choosed</h3>
                  <h3 className="font-regular">C4, C5, C6</h3>
                </div>
              </div>

              <div className="h-0.5 w-full bg-gray-300"></div>
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Total Payment</h2>
                <h2 className="text-xl text-blue-700">$30</h2>
              </div>
            </div>
          </div>
          <button className="w-full rounded-xl bg-blue-700 p-2 text-white">
            Checkout Now
          </button>
        </section>
      </div>
    </section>
  );
};

export default OrderPages;
