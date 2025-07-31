// components/molecules/PaymentModal.jsx
import { Link } from "react-router-dom";

const ModalPayment = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-xl max-w-md p-6 shadow-lg relative">
        <div className="mb-4">
          <h1 className="text-xl font-semibold mb-2">Payment Info</h1>

          <div className="mb-4">
            <h4 className="text-sm text-gray-500">No. Rekening Virtual</h4>
            <div className="flex justify-between items-center mt-1">
              <h3 className="text-base">12321328913829724</h3>
              <button className="text-sm text-blue-600 hover:underline">
                Copy
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm text-gray-500">Total Payment</h4>
            <h3 className="text-lg text-blue-600">$30</h3>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            Pay this payment bill before it is due,
            <span className="text-red-500 font-medium"> on June 23, 2023</span>.
            If the bill has not been paid by the specified time, it will be
            forfeited.
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <Link to="/pages/payment/ticket-results.html">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Check Payment
            </button>
          </Link>
          <button
            onClick={onClose}
            className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Pay Later
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-black text-lg"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ModalPayment;
