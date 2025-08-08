import { useEffect, useState } from "react";
import { Circle, Line } from "../../atoms";
import { ModalPayment } from "../../molecules";
import { Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import gpayIcon from "/src/assets/icons/payment-method/googlepay-icon.svg";
import visaIcon from "/src/assets/icons/payment-method/visa-icon.svg";
import gopayIcon from "/src/assets/icons/payment-method/gopay-icon.svg";
import paypalIcon from "/src/assets/icons/payment-method/paypal-icon.svg";
import danaIcon from "/src/assets/icons/payment-method/dana-icon.svg";
import bcaIcon from "/src/assets/icons/payment-method/bca-icon.svg";
import briIcon from "/src/assets/icons/payment-method/bri-icon.svg";
import ovoIcon from "/src/assets/icons/payment-method/ovo-icon.svg";
import { toast } from "react-toastify";

const PaymentPages = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* State */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payment, setPayment] = useState("");

  /* Check if location state null back to home */
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  if (!location.state) return null;

  const { details, time, dateShow, cinema, seat } = location.state;

  /* Get UserData from localstorage */
  const user = JSON.parse(localStorage.getItem("userData"));

  /* count Price */
  const countPrices = () => {
    const price = seat.length * 10;
    return `$ ${price}`;
  };

  /* Handle Form */
  const handleForm = (e) => {
    e.preventDefault();
    const name = e.target.personalName.value;
    const email = e.target.personalEmail.value;
    const phoneNumber = e.target.personalNumber.value;

    /* Check if input value === null */
    if (!name || !email || !phoneNumber || !payment) {
      toast.warning(
        "Please fill in all the columns and choose a payment method",
        {
          position: "top-center",
          autoClose: 3000,
        },
      );
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <section className="relative flex flex-col items-center gap-10 bg-gray-200 p-10">
      {/* Step Progress */}
      <div className="flex items-center justify-between lg:w-150">
        <Circle name="Dates and Time" color="bg-green-700">
          <Check />
        </Circle>
        <Line />
        <Circle name="Seat" color="bg-green-700">
          <Check />
        </Circle>
        <Line />
        <Circle name="Payment" color="bg-blue-700">
          3
        </Circle>
      </div>
      {/* Step Progress */}

      {/* Contaienr Form */}
      <div className="rounded-2xl bg-white p-5 lg:w-200">
        <form
          id="payment-order"
          className="flex flex-col gap-5"
          onSubmit={handleForm}
        >
          {/* <!-- Payment Info --> */}
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold">Payment Info</h1>
            <div className="payment-info-wrapper">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="date-showing"
              >
                DATE & TIME
              </label>
              <input
                type="text"
                name="date-showing"
                id="date-showing"
                className="mt-2 block w-full rounded-md border border-gray-300 p-2"
                value={`${dateShow} at ${time}pm`}
                disabled
              />
            </div>
            <div className="payment-info-wrapper">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="movie-title"
              >
                MOVIE TITLE
              </label>
              <input
                type="text"
                name="movie-title"
                id="movie-title"
                className="mt-2 block w-full rounded-md border border-gray-300 p-2"
                value={details.title}
                disabled
              />
            </div>
            <div className="payment-info-wrapper">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="cinema-name"
              >
                CINEMA NAME
              </label>
              <input
                type="text"
                name="cinema-name"
                id="cinema-name"
                className="mt-2 block w-full rounded-md border border-gray-300 p-2"
                value={`${cinema} Cinema`}
                disabled
              />
            </div>
            <div className="payment-info-wrapper">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="total-tickets"
              >
                NUMBER OF TICKETS
              </label>
              <input
                type="text"
                name="total-tickets"
                id="total-tickets"
                className="mt-2 block w-full rounded-md border border-gray-300 p-2"
                value={`${seat.length} pieces`}
                disabled
              />
            </div>
            <div className="payment-info-wrapper">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="total-payment"
              >
                TOTAL PAYMENT
              </label>
              <input
                type="text"
                name="total-payment"
                id="total-payment"
                className="mt-2 block w-full rounded-md border border-gray-300 p-2"
                value={countPrices()}
                disabled
              />
            </div>
          </div>
          {/* <!-- Payment Info --> */}

          {/* <!-- Payment Personal Info --> */}
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">Personal Information</h1>
            <div className="payment-info-wrapper">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="personal-name"
              >
                Full Name
              </label>
              <input
                type="text"
                name="personalName"
                id="personal-name"
                className="mt-2 block w-full rounded-md border border-gray-300 p-2"
                placeholder="Jonas El Rodriguez"
              />
            </div>
            <div className="payment-info-wrapper">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="personal-email"
              >
                Email
              </label>
              <input
                type="email"
                name="personalEmail"
                id="personal-email"
                className="mt-2 block w-full rounded-md border border-gray-300 p-2"
                placeholder={user.email}
              />
            </div>
            <div className="payment-info-wrapper flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="personal-number"
              >
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute top-4 left-2 border-r-1 px-2 text-gray-500">
                  +62
                </span>
                <input
                  type="tel"
                  name="personalNumber"
                  id="personal-number"
                  className="mt-2 block w-full rounded-md border border-gray-300 p-2 pl-17"
                  placeholder="81445687121"
                />
              </div>
            </div>
          </div>
          {/* <!-- Payment Personal Info --> */}

          {/* <!-- Payment Method --> */}
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">Payment Method</h1>
            <div className="payment-method-wrapper flex flex-wrap justify-between gap-5">
              <button
                type="button"
                className={`flex w-full justify-center rounded-md border-1 border-gray-200 p-3 shadow lg:w-40 ${payment === "Gpay" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
                onClick={() => setPayment("Gpay")}
              >
                <img src={gpayIcon} alt="Google Pay Icon" />
              </button>
              <button
                type="button"
                value="VISA"
                className={`flex w-full justify-center rounded-md border-1 border-gray-200 p-3 shadow lg:w-40 ${payment === "VISA" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
                onClick={() => setPayment("VISA")}
              >
                <img src={visaIcon} alt="Visa Icon" />
              </button>
              <button
                type="button"
                className={`flex w-full justify-center rounded-md border-1 border-gray-200 p-3 shadow lg:w-40 ${payment === "Gopay" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
                onClick={() => setPayment("Gopay")}
              >
                <img src={gopayIcon} alt="Gopay Icon" />
              </button>
              <button
                type="button"
                className={`flex w-full justify-center rounded-md border-1 border-gray-200 p-3 shadow lg:w-40 ${payment === "Paypal" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
                onClick={() => setPayment("Paypal")}
              >
                <img src={paypalIcon} alt="Paypal Icon" />
              </button>
              <button
                type="button"
                className={`flex w-full justify-center rounded-md border-1 border-gray-200 p-3 shadow lg:w-40 ${payment === "DANA" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
                onClick={() => setPayment("DANA")}
              >
                <img src={danaIcon} alt="Dana Icon" />
              </button>
              <button
                type="button"
                value="BCA"
                className={`flex w-full justify-center rounded-md border-1 border-gray-200 p-3 shadow lg:w-40 ${payment === "BCA" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
                onClick={() => setPayment("BCA")}
              >
                <img src={bcaIcon} alt="BCA Icon" />
              </button>
              <button
                type="button"
                className={`flex w-full justify-center rounded-md border-1 border-gray-200 p-3 shadow lg:w-40 ${payment === "BRI" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
                onClick={() => setPayment("BRI")}
              >
                <img src={briIcon} alt="BRI Icon" />
              </button>
              <button
                type="button"
                className={`flex w-full justify-center rounded-md border-1 border-gray-200 p-3 shadow lg:w-40 ${payment === "OVO" ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
                onClick={() => setPayment("OVO")}
              >
                <img src={ovoIcon} alt="OVO Icon" />
              </button>
            </div>
          </div>
          {/* <!-- Payment Method --> */}

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 text-white shadow hover:bg-blue-700"
          >
            Pay your order
          </button>
        </form>
      </div>
      {/* Modal Payment Component, call if state isModalOpen = true */}
      <ModalPayment
        isOpen={isModalOpen}
        data={location.state}
        prices={countPrices()}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default PaymentPages;
