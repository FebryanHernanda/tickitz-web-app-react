// components/molecules/PaymentModal.jsx
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createOrder } from "../../../store/slices/orderSlice";
import { updateProfile } from "../../../store/slices/userSlice";
// import { addOrder } from "../../../store/slices/userSlice";

const ModalPayment = (props) => {
  /* props data */
  const {
    isOpen,
    cinemaData,
    ScheduleTime,
    seatData,
    onClose,
    paymentMethod,
    prices,
    formData,
  } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user.data);

  const mappingSeats = seatData.map((s) => ({
    seat_id: parseInt(s, 10),
    status: "booked",
  }));

  const cinemaBooking = {
    cinemas_schedule_id: cinemaData.CinemaScheduleID,
    payment_method_id: paymentMethod,
    seats: mappingSeats,
    total_prices: cinemaData.TicketPrice * mappingSeats.length,
  };

  // Update profileData Payload
  const formDataPayload = new FormData();
  formDataPayload.append("first_name", formData.fullName);
  formDataPayload.append("phone_number", formData.phoneNumber);
  formDataPayload.append("email", formData.email);

  if (!isOpen) return null;

  const handleCancelPayment = () => {
    toast.warning("You are required to pay for the ticket.", {
      position: "top-center",
      autoClose: 3000,
    });

    const bookingData = {
      ...cinemaBooking,
      is_active: false,
      is_paid: false,
    };

    dispatch(createOrder(bookingData));
    dispatch(updateProfile(formDataPayload));
    navigate("/movies");

    onClose(false);
  };

  /* Handle Payment */
  const handlePayment = () => {
    toast.success("Your ticket is ready — it’s been printed successfully!", {
      position: "top-center",
      autoClose: 3000,
    });

    const bookingData = {
      ...cinemaBooking,
      is_active: true,
      is_paid: true,
    };

    dispatch(createOrder(bookingData));
    dispatch(updateProfile(formDataPayload));
    navigate("results", {
      replace: true,
      state: { cinemaData, cinemaBooking },
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
              <h3 className="text-base">{data.virtual_account}</h3>
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
            <span className="font-medium text-red-500">{` on ${ScheduleTime}`}</span>
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
