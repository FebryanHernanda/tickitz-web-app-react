// components/molecules/PaymentModal.jsx
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addOrder } from "../../../store/slices/userSlice";

const ModalPayment = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  /* props data */
  const { isOpen, prices, data, onClose, paymentMethod } = props;

  const orderData = { ...data, prices, paymentMethod };

  if (!isOpen) return null;

  const handleCancelPayment = () => {
    toast.warning("You are required to pay for the ticket.", {
      position: "top-center",
      autoClose: 3000,
    });

    /* Check Duplicate Id true or false? */
    const isDuplicate = userData.order.some((item) => {
      return item.orderId === orderData.orderId;
    });

    navigate("/movies");

    /* if not false, push data to order array */
    if (!isDuplicate) {
      dispatch(
        addOrder({
          userId: userData.id,
          orders: orderData,
          isPaid: false,
        }),
      );
    }

    onClose(false);
  };

  /* Handle Payment */
  const handlePayment = () => {
    toast.success("Your ticket is ready — it’s been printed successfully!", {
      position: "top-center",
      autoClose: 3000,
    });

    navigate("results");

    /* Check Duplicate Id true or false? */
    const isDuplicate = userData.order.some((item) => {
      return item.orderId === orderData.orderId;
    });

    /* if not false, push data to order array */
    if (!isDuplicate) {
      dispatch(
        addOrder({
          userId: userData.id,
          orders: orderData,
          isPaid: true,
        }),
      );
    }
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
            onClick={handleCancelPayment}
            className="rounded-md border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
          >
            Pay Later
          </button>
        </div>

        <button
          onClick={() => onClose(false)}
          className="absolute top-2 right-3 text-lg text-gray-400 hover:text-black"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ModalPayment;
