import { useState } from "react";
import { Circle, Line } from "../../atoms";
import { ModalPayment } from "../../molecules";
import { Check } from "lucide-react";

const PaymentPages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative flex flex-col items-center gap-10 bg-gray-200 p-10">
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
      <div className="rounded-2xl bg-white p-5 lg:w-200">
        <form
          id="payment-order"
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
          }}
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
                value="Tuesday, 07 July 2020 at 02:00pm"
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
                value="Spider-Man: Homecoming"
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
                value="CineOne21 Cinema"
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
                value="3 pieces"
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
                value="$30,00"
                disabled
              />
            </div>
          </div>

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
                name="personal-name"
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
                name="personal-email"
                id="personal-email"
                className="mt-2 block w-full rounded-md border border-gray-300 p-2"
                placeholder="jonasrodri123@gmail.com"
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
                  name="personal-number"
                  id="personal-number"
                  className="mt-2 block w-full rounded-md border border-gray-300 p-2 pl-17"
                  placeholder="81445687121"
                />
              </div>
            </div>
          </div>

          {/* <!-- Payment Method --> */}
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">Payment Method</h1>
            <div className="payment-method-wrapper flex flex-wrap justify-between gap-5">
              <button
                type="button"
                value="Gpay"
                className="flex w-full justify-center rounded-md bg-white p-3 shadow hover:bg-gray-100 lg:w-40"
              >
                <img
                  src="/src/assets/icons/payment-method/googlepay-icon.svg"
                  alt="Google Pay Icon"
                />
              </button>
              <button
                type="button"
                value="VISA"
                className="flex w-full justify-center rounded-md bg-white p-3 shadow hover:bg-gray-100 lg:w-40"
              >
                <img
                  src="/src/assets/icons/payment-method/visa-icon.svg"
                  alt="Visa Icon"
                />
              </button>
              <button
                type="button"
                value="Gopay"
                className="flex w-full justify-center rounded-md bg-white p-3 shadow hover:bg-gray-100 lg:w-40"
              >
                <img
                  src="/src/assets/icons/payment-method/gopay-icon.svg"
                  alt="Gopay Icon"
                />
              </button>
              <button
                type="button"
                value="Paypal"
                className="flex w-full justify-center rounded-md bg-white p-3 shadow hover:bg-gray-100 lg:w-40"
              >
                <img
                  src="/src/assets/icons/payment-method/paypal-icon.svg"
                  alt="Paypal Icon"
                />
              </button>
              <button
                type="button"
                value="Dana"
                className="flex w-full justify-center rounded-md bg-white p-3 shadow hover:bg-gray-100 lg:w-40"
              >
                <img
                  src="/src/assets/icons/payment-method/dana-icon.svg"
                  alt="Dana Icon"
                />
              </button>
              <button
                type="button"
                value="BCA"
                className="flex w-full justify-center rounded-md bg-white p-3 shadow hover:bg-gray-100 lg:w-40"
              >
                <img
                  src="/src/assets/icons/payment-method/bca-icon.svg"
                  alt="BCA Icon"
                />
              </button>
              <button
                type="button"
                value="BRI"
                className="flex w-full justify-center rounded-md bg-white p-3 shadow hover:bg-gray-100 lg:w-40"
              >
                <img
                  src="/src/assets/icons/payment-method/bri-icon.svg"
                  alt="BRI Icon"
                />
              </button>
              <button
                type="button"
                value="OVO"
                className="flex w-full justify-center rounded-md bg-white p-3 shadow hover:bg-gray-100 lg:w-40"
              >
                <img
                  src="/src/assets/icons/payment-method/ovo-icon.svg"
                  alt="OVO Icon"
                />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 text-white shadow transition hover:bg-blue-700"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            Pay your order
          </button>
        </form>
      </div>
      <ModalPayment
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default PaymentPages;
