import { useLocation, useNavigate } from "react-router-dom";
import { MoveDown, MoveRight } from "lucide-react";

import heroBg from "/src/assets/background/background.png";
import logoWhite from "/src/assets/icons/logo/tickitz-logo-white.svg";
import barcodeImg from "/src/assets/barcode.svg";

const ResultsPages = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { cinemaData, cinemaBooking } = location.state;

  console.log(cinemaData);
  console.log(cinemaBooking);

  /* Convert SeatsID */
  const rows = ["A", "B", "C", "D", "E", "F", "G"];
  const totalCols = 14;

  const getSeatLabel = (seat_id) => {
    const rowIndex = Math.floor((seat_id - 1) / totalCols);
    const colIndex = ((seat_id - 1) % totalCols) + 1;
    return `${rows[rowIndex]}${colIndex}`;
  };
  /* Convert SeatsID */

  /* HandleButton Done */
  const handleButton = () => {
    navigate("/movies");
  };

  return (
    <div className="bg-gray-200">
      <div className="flex flex-col lg:flex-row">
        {/* Left Container */}
        <section
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7)), url(${heroBg})`,
          }}
          className="h-150 w-full bg-cover lg:h-250"
        >
          <div className="flex h-full w-full flex-row items-center px-5 lg:px-10 2xl:pl-40">
            <div className="flex flex-col items-center gap-5 lg:items-start">
              <img src={logoWhite} alt="Tickitz Logo" className="w-80" />
              <h1 className="text-center text-5xl font-bold text-white lg:text-left">
                Thank you For Purchasing
              </h1>
              <p className="text-center text-xl text-gray-300 lg:text-left">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore
                numquam atque consequuntur amet error nemo?
              </p>
              <div className="flex items-center gap-5">
                <h3 className="text-center text-xl text-white lg:text-left">
                  Please Download Your Ticket
                </h3>
                <div className="text-white">
                  <span className="block lg:hidden">
                    <MoveDown />
                  </span>
                  <span className="hidden lg:block">
                    <MoveRight />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Left Container */}

        {/* <!-- Right Container --> */}
        <section className="flex flex-col items-center justify-center gap-5 p-10 xl:px-40">
          <div className="w-75 overflow-hidden rounded-2xl bg-white p-5 xl:w-80">
            <div className="flex flex-col items-center gap-5">
              <img src={barcodeImg} alt="Barcode Ticket" className="w-50" />

              <div className="relative mb-5 flex w-84 items-center justify-between xl:w-88">
                <div className="absolute h-8 w-8 rounded-full bg-gray-200"></div>
                <hr className="w-full border-dashed border-gray-200" />
                <div className="absolute right-0 h-8 w-8 rounded-full bg-gray-200"></div>
              </div>

              <div className="flex w-full justify-between gap-10">
                <div className="flex flex-col gap-5">
                  <div>
                    <h4 className="text-lg text-gray-400">Movie</h4>
                    <h4 className="">{`${cinemaData?.MovieName.slice(0, 15)} ...`}</h4>
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-400">Date</h4>
                    <h4 className="">
                      {" "}
                      {new Date(cinemaData.ScheduleDate).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                        },
                      )}
                    </h4>
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-400">Count</h4>
                    <h4 className="">{`${cinemaBooking.seats.length} pcs`}</h4>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div>
                    <h4 className="text-lg text-gray-400">Category</h4>
                    <h4 className="">PG-13</h4>
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-400">Time</h4>
                    <h4 className="">{`${cinemaData.ScheduleTime}`}</h4>
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-400">Seats</h4>
                    <h4>
                      {cinemaBooking?.seats.length > 0
                        ? cinemaBooking.seats
                            .map((s) => getSeatLabel(s.seat_id))
                            .join(", ")
                        : "-"}
                    </h4>
                  </div>
                </div>
              </div>

              <div className="flex w-full justify-between rounded-lg border-1 border-gray-200 p-2">
                <h3 className="">Total</h3>
                <h3 className="text-lg text-blue-700">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(cinemaBooking.total_prices)}
                </h3>
              </div>
            </div>
          </div>
          <div className="flex w-75 flex-col gap-3 xl:w-80">
            <button className="rounded-lg border-1 border-blue-600 px-4 py-2 text-blue-700">
              Download
            </button>
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
              onClick={handleButton}
            >
              Done
            </button>
          </div>
        </section>
        {/* <!-- Right Container --> */}
      </div>
    </div>
  );
};

export default ResultsPages;
