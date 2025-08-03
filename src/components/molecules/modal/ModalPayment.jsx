// components/molecules/PaymentModal.jsx
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ModalPayment = (props) => {
  const navigate = useNavigate();

  /* props data */
  const { isOpen, prices, data, onClose } = props;

  if (!isOpen) return null;

  /* Handle Payment */
  const handlePayment = () => {
    navigate("results", {
      state: {
        data,
      },
    });
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
      {/* Container */}
      <div className="relative max-w-md rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4">
          <h1 className="mb-2 text-xl font-semibold">Payment Info</h1>

          <div className="mb-4">
            <h4 className="text-sm text-gray-500">No. Rekening Virtual</h4>
            <div className="mt-1 flex items-center justify-between">
              <h3 className="text-base">12321328913829724</h3>
              <button className="text-sm text-blue-600 hover:underline">
                Copy
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm text-gray-500">Total Payment</h4>
            <h3 className="text-lg text-blue-600">{prices}</h3>
          </div>

          <p className="text-sm leading-relaxed text-gray-500">
            Pay this payment bill before it is due,
            <span className="font-medium text-red-500">{` on ${data.dateShow}`}</span>
            . If the bill has not been paid by the specified time, it will be
            forfeited.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={handlePayment}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Check Payment
          </button>
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
          >
            Pay Later
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-lg text-gray-400 hover:text-black"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ModalPayment;
