import { useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";

const TicketHistory = (props) => {
  const [showDetails, setShowDetails] = useState(null);
  const { userData } = props;

  /* Cinemas Icon Data */
  const cinemaLogos = {
    CineOne21: "CineOne-logo.svg",
    EBV: "ebv-logo.svg",
    hiflix: "hiflix-logo.svg",
  };

  /* Show Details based on OrderId  */
  const handleDetails = (id) => {
    setShowDetails(showDetails === id ? null : id);
  };

  return (
    <>
      {userData.order.map((order, idx) => (
        /* Ticket Info */
        <div
          key={idx}
          className="flex flex-col gap-[30px] overflow-hidden rounded-[24px] bg-white p-[30px]"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <h3 className="text-gray-500">{order.dateShow}</h3>
              <h1 className="text-2xl">{order.details.title}</h1>
            </div>
            <div>
              <img
                src={`/src/assets/icons/sponsor/${cinemaLogos[order.cinema]}`}
                alt={`${order.cinema} Logo`}
              />
            </div>
          </div>
          <hr />
          <h3 className="text-lg">Ticket Info</h3>
          {/* Ticket status */}
          <div className="ticket-status flex items-center justify-between">
            <div className="ticket-button space-x-3">
              <button
                type="button"
                id="active"
                className="rounded-md bg-green-200 px-4 py-2 font-semibold text-green-500"
              >
                Ticket in active
              </button>
              <button
                type="button"
                id="not-paid"
                className="rounded-md bg-[#E82C2C33] px-4 py-2 font-semibold text-red-500"
              >
                Not Paid
              </button>
            </div>
            <button
              className="flex gap-2"
              onClick={() => handleDetails(order.orderId)}
            >
              Show Details
              {order.orderId === showDetails ? <ArrowDown /> : <ArrowRight />}
            </button>
          </div>
          {/* Ticket status */}
          {/* Ticket Details */}
          {order.orderId === showDetails && (
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
                  <h3 className="font-regular text-blue-600">$30</h3>
                </div>
                <p className="text-gray-500">
                  Pay this payment bill before it is due,{" "}
                  <span className="text-red-500">{order.dateShow}</span>. If the
                  bill has not been paid by the specified time, it will be
                  forfeited
                </p>
                <button className="rounded-md bg-blue-700 px-4 py-2 text-white transition hover:bg-blue-700 xl:w-50">
                  Cek Pembayaran
                </button>
              </div>
            </div>
          )}
          {/* Ticket Details */}
        </div>
      ))}
    </>
  );
};

export default TicketHistory;
