import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

import barcodeImg from "/src/assets/barcode.svg";
import getCinemaLogo from "../../../data/cinema/getCinemaLogo";

const TicketHistory = (props) => {
  const [showDetails, setShowDetails] = useState(null);
  const { orderData } = props;

  /* Show Details based on OrderId  */
  const handleDetails = (id) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <>
      {orderData.map((data, idx) => (
        /* Ticket Info */
        <div
          key={idx}
          className="flex flex-col gap-[30px] overflow-hidden rounded-[24px] bg-white p-[30px]"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-gray-500">{data.date}</h3>
              <h1 className="text-2xl">{data.title}</h1>
            </div>
            <div>
              <img
                src={getCinemaLogo(data.cinema)}
                alt={`${data.cinema} Logo`}
              />
            </div>
          </div>
          <hr />
          {/* Ticket status */}
          <div className="ticket-status flex flex-col items-center justify-between gap-5 md:flex-row">
            <div className="flex w-full flex-col gap-5 space-x-3 md:w-1/2 md:flex-row">
              <button
                type="button"
                className={`w-full rounded-md px-4 py-2 font-semibold md:w-60 ${data.is_paid ? "bg-green-200 text-green-700" : "bg-gray-200 text-gray-600"}`}
              >
                {data.is_active ? "Ticket in active" : "Ticket not active"}
              </button>
              <button
                type="button"
                className={`w-full rounded-md px-4 py-2 font-semibold md:w-60 ${data.is_paid ? "bg-blue-200 text-blue-700" : "bg-red-200 text-red-600"}`}
              >
                {data.is_paid ? "Paid" : "Not Paid"}
              </button>
            </div>
            <button
              className="flex gap-2"
              onClick={() => handleDetails(data.qr_code)}
            >
              Show Details
              {data.qr_code === showDetails ? <ArrowDown /> : <ArrowRight />}
            </button>
          </div>
          {/* Ticket status */}

          {/* Ticket Details */}
          {data.qr_code === showDetails && (
            <>
              {data.is_paid ? (
                <>
                  <h3 className="font-bold">Ticket Information</h3>
                  <div className="flex flex-col items-center gap-10 md:flex-row">
                    <img
                      src={barcodeImg}
                      alt="Barcode Ticket"
                      className="w-40"
                    />
                    <div className="flex flex-col justify-between gap-5">
                      {/* row 1 */}
                      <div className="flex gap-10">
                        <div>
                          <h4 className="text-gray-500">Category</h4>
                          <h5>{data.age_rating}</h5>
                        </div>
                        <div>
                          <h4 className="text-gray-500">Time</h4>
                          <h5>{data.time}</h5>
                        </div>
                        <div>
                          <h4 className="text-gray-500">Seats</h4>
                          <h5>
                            {data.seat_numbers.map((item) => item).join(", ")}
                          </h5>
                        </div>
                      </div>
                      {/* Row 2 */}
                      <div className="flex gap-10">
                        <div>
                          <h4 className="text-gray-500">Movie</h4>
                          <h5>{data.title.slice(0, 10)}</h5>
                        </div>
                        <div>
                          <h4 className="text-gray-500">Date</h4>
                          <h5>
                            {" "}
                            {new Date(data.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </h5>
                        </div>
                        <div>
                          <h4 className="text-gray-500">Count</h4>
                          <h5>{data.seat_numbers.length} Pcs</h5>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-gray-500">Total</h4>
                      <h2 className="text-2xl">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(data.total_prices)}
                      </h2>
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
                          <h3 className="font-semibold">
                            {data.virtual_account}
                          </h3>
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
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            minimumFractionDigits: 0,
                          }).format(data.total_prices)}
                        </h3>
                      </div>
                      <p className="text-gray-500">
                        Pay this payment bill before it is due,{" "}
                        <span className="text-red-500">{data.date}</span>. If
                        the bill has not been paid by the specified time, it
                        will be forfeited
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
