import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { ChooseSeat } from "../../organisms";
import { Circle, Line } from "../../atoms";

const OrderPages = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* Set state Seat */
  const [seat, setSeat] = useState([]);

  /* Check data null back to landing */
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  if (!location.state) return null;

  /* Get all data */
  const { details, time, date, cinema } = location.state;

  /* Get Date Show */
  const moviesShowDate = new Date(date);
  const getDate = moviesShowDate.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const getYear = moviesShowDate.getFullYear();
  const dateShow = `${getDate} ${getYear}`;

  /* count price */
  const countPrices = () => {
    const price = seat.length * 10;
    return `$ ${price}`;
  };

  /* Generate UniqueID */
  const orderId = Math.random().toString(16).slice(2);

  /* Handle Checkout */
  const handleCheckout = () => {
    navigate("/payment", {
      state: {
        details,
        time,
        dateShow,
        cinema,
        seat,
        orderId,
      },
    });
  };

  return (
    <section className="flex flex-col items-center gap-10 bg-gray-200 p-5 lg:p-10">
      {/* Step Progress */}
      <div className="hidden items-center justify-between lg:flex lg:w-150">
        <Circle name="Dates and Time" color="bg-green-700">
          <Check />
        </Circle>
        <Line />
        <Circle name="Seat" color="bg-blue-700">
          2
        </Circle>
        <Line />
        <Circle name="Payment" color="bg-gray-400">
          3
        </Circle>
      </div>
      {/* Step Progress */}

      {/* Main Container */}
      <div className="flex w-full max-w-screen-2xl flex-col justify-between gap-10 lg:flex-row">
        {/* <!-- Book Seat Section --> */}
        <section className="flex w-full flex-col gap-10 rounded-2xl bg-white p-5 lg:w-150 xl:w-230 2xl:w-270">
          {/* <!-- Card Movies --> */}
          <div className="flex flex-col items-center justify-between gap-5 rounded-2xl border-1 border-gray-200 p-3 sm:flex-row lg:h-40">
            <div className="h-40 w-full lg:h-full lg:w-200">
              <img
                src={`https://image.tmdb.org/t/p/original${details.poster_path}`}
                alt="Movies Posters"
                className="h-full w-full rounded-md object-cover object-[20%_10%]"
              />
            </div>
            <div className="flex w-full flex-col gap-5">
              <h3 className="font-regular text-xl">{details.title}</h3>
              <div className="flex gap-2">
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
              <div className="card-movies-bottom">
                <h4 className="text-medium font-regular">{`Regular - ${time}`}</h4>
              </div>
            </div>
            <div className="h-full w-full place-content-end self-end md:w-80">
              <button
                className="w-full rounded-xl bg-blue-700 p-2 text-white"
                onClick={() => {
                  navigate("/movies");
                }}
              >
                Change
              </button>
            </div>
          </div>
          {/* <!-- Card Movies --> */}

          <h1 className="text-2xl font-semibold">Choose Your Seat</h1>

          {/* <!-- Choose Seat --> */}
          <ChooseSeat setSeat={setSeat} />
          {/* <!-- Choose Seat --> */}

          {/* Seating key Container */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-semibold">Seating Key</h3>
            <div className="flex flex-wrap items-center justify-center gap-5 p-5 text-sm lg:justify-around">
              <div className="flex items-center gap-2">
                <ArrowDown />
                <span>A - G</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight />
                <span>1 - 14</span>
              </div>
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
          {/* Seating key Container */}
        </section>
        {/* <!-- Book Seat Section --> */}

        {/* Checkout Container */}
        <section className="flex flex-col gap-5 xl:w-100">
          <div className="rounded-2xl bg-white p-5">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="../src/assets/icons/sponsor/CineOne-logo.svg"
                    alt="CineOne21 Logo"
                    className="w-50"
                  />
                  <h1 className="text-3xl">{`${cinema} Cinema`}</h1>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-gray-500">Movie selected</h3>
                  <h3 className="text-right">{details.title}</h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-gray-500">{dateShow}</h3>
                  <h3>{time}</h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-gray-500">One ticket price</h3>
                  <h3>$10</h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-gray-500">Seat Choosed</h3>
                  <h3 className="">
                    {seat.length > 0 ? seat.join(", ") : "-"}
                  </h3>
                </div>
              </div>

              <div className="h-0.5 w-full bg-gray-300"></div>
              <div className="flex items-center justify-between">
                <h2 className="">Total Payment</h2>
                <h3 className="text-lg font-semibold text-blue-700">
                  {countPrices()}
                </h3>
              </div>
            </div>
          </div>
          <button
            className="w-full rounded-xl bg-blue-700 p-2 text-white"
            onClick={handleCheckout}
          >
            Checkout Now
          </button>
        </section>
        {/* Checkout Container */}
      </div>
      {/* Main Container */}
    </section>
  );
};

export default OrderPages;
