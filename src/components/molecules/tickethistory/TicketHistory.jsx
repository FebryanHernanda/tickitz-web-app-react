import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

import cineOneLogo from "/src/assets/icons/sponsor/CineOne-logo.svg";
import ebvLogo from "/src/assets/icons/sponsor/ebv-logo.svg";
import hiflixLogo from "/src/assets/icons/sponsor/hiflix-logo.svg";

const TicketHistory = (props) => {
  const [showDetails, setShowDetails] = useState(null);
  const { userData } = props;

  /* Cinemas Icon Data */
  const cinemaLogos = {
    cineone21: cineOneLogo,
    ebv: ebvLogo,
    hiflix: hiflixLogo,
  };

  /* Show Details based on OrderId  */
  const handleDetails = (id) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <>
      {userData.map((data, idx) => (
        /* Ticket Info */
        <div
          key={idx}
          className="flex flex-col gap-[30px] overflow-hidden rounded-[24px] bg-white p-[30px]"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-gray-500">{data.orders.dateShow}</h3>
              <h1 className="text-2xl">{data.orders.details.title}</h1>
            </div>
            <div>
              <img
                src={cinemaLogos[data.orders.cinema.toLowerCase()]}
                alt={`${data.orders.cinema} Logo`}
              />
            </div>
          </div>
          <hr />
          {/* Ticket status */}
          <div className="ticket-status flex flex-col items-center justify-between gap-5 md:flex-row">
            <div className="flex w-full flex-col gap-5 space-x-3 md:w-1/2 md:flex-row">
              <button
                type="button"
                className="w-full rounded-md bg-green-200 px-4 py-2 font-semibold text-green-500 md:w-60"
              >
                Ticket in active
              </button>
              <button
                type="button"
                className={`w-full rounded-md px-4 py-2 font-semibold md:w-60 ${data.isPaid ? "bg-blue-200 text-blue-700" : "bg-red-200 text-red-600"}`}
              >
                {data.isPaid ? "Paid" : "Not Paid"}
              </button>
            </div>
            <button
              className="flex gap-2"
              onClick={() => handleDetails(data.orders.orderId)}
            >
              Show Details
              {data.orders.orderId === showDetails ? (
                <ArrowDown />
              ) : (
                <ArrowRight />
              )}
            </button>
          </div>
          {/* Ticket status */}

          {/* Ticket Details */}
          {data.orders.orderId === showDetails && (
            <>
              {data.isPaid ? (
                <>
                  <h3 className="font-bold">Ticket Information</h3>
                  <div className="flex flex-col items-center gap-10 md:flex-row">
                    <img
                      src="/public/barcode.svg"
                      alt="Barcode Ticket"
                      className="w-40"
                    />
                    <div className="flex flex-col justify-between gap-5">
                      {/* row 1 */}
                      <div className="flex gap-10">
                        <div>
                          <h4 className="text-gray-500">Category</h4>
                          <h5>PG-13</h5>
                          {/* ! need data pg-13 */}
                        </div>
                        <div>
                          <h4 className="text-gray-500">Time</h4>
                          <h5>{data.orders.time}</h5>
                        </div>
                        <div>
                          <h4 className="text-gray-500">Seats</h4>
                          <h5>
                            {data.orders.seat.map((item) => item).join(", ")}
                          </h5>
                        </div>
                      </div>
                      {/* Row 2 */}
                      <div className="flex gap-5">
                        <div>
                          <h4 className="text-gray-500">Movie</h4>
                          <h5>{data.orders.details.title.slice(0, 10)}</h5>
                        </div>
                        <div>
                          <h4 className="text-gray-500">Date</h4>
                          <h5>{data.orders.dateShow.substring(7)}</h5>
                        </div>
                        <div>
                          <h4 className="text-gray-500">Count</h4>
                          <h5>{data.orders.seat.length} Pcs</h5>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-gray-500">Total</h4>
                      <h2 className="text-2xl">{data.orders.prices}</h2>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-5">
                    <h3 className="text-2xl">Ticket Information</h3>
                    <div className="flex flex-col gap-5">
                      <div className="flex justify-between">
                        <div className="flex flex-row gap-10">
                          <h4 className="font-regular text-gray-500">
                            No. Rekening Virtual
                          </h4>
                          <h4 className="font-regular text-gray-500">:</h4>
                        </div>
                        <div className="flex gap-5">
                          <h3 className="font-semibold">12321328913829724</h3>
                          <button className="text-sm text-blue-600 hover:underline">
                            Copy
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex flex-row gap-10">
                          <h4 className="font-regular text-gray-500">
                            Total Payment
                          </h4>
                          <h4 className="font-regular text-gray-500">:</h4>
                        </div>
                        <h3 className="font-regular text-blue-600">
                          {data.orders.prices}
                        </h3>
                      </div>
                      <p className="text-gray-500">
                        Pay this payment bill before it is due,{" "}
                        <span className="text-red-500">
                          {data.orders.dateShow}
                        </span>
                        . If the bill has not been paid by the specified time,
                        it will be forfeited
                      </p>
                      <button className="rounded-md bg-blue-700 px-4 py-2 text-white transition hover:bg-blue-700 xl:w-50">
                        Cek Pembayaran
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          {/* Ticket Details */}
        </div>
      ))}
    </>
  );
};

export default TicketHistory;
