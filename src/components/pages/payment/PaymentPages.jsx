const PaymentPages = () => {
  return (
    <section class="bg-gray-200 p-10">
      <div class="bg-white p-5 rounded-2xl">
        <form
          action="/pages/payment/payment-modal.html"
          id="payment-order"
          className="flex flex-col gap-5"
        >
          {/* <!-- Payment Info --> */}
          <div className="flex flex-col gap-5 ">
            <h1 className="text-3xl font-bold ">Payment Info</h1>
            <div className="payment-info-wrapper ">
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
                className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
                value="Tuesday, 07 July 2020 at 02:00pm"
                disabled
              />
            </div>
            <div className="payment-info-wrapper ">
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
                className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
                value="Spider-Man: Homecoming"
                disabled
              />
            </div>
            <div className="payment-info-wrapper ">
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
                className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
                value="CineOne21 Cinema"
                disabled
              />
            </div>
            <div className="payment-info-wrapper ">
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
                className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
                value="3 pieces"
                disabled
              />
            </div>
            <div className="payment-info-wrapper ">
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
                className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
                value="$30,00"
                disabled
              />
            </div>
          </div>

          {/* <!-- Payment Personal Info --> */}
          <div className="flex flex-col gap-5 ">
            <h1 className="text-3xl font-semibold ">Personal Information</h1>
            <div className="payment-info-wrapper ">
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
                className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="Jonas El Rodriguez"
              />
            </div>
            <div className="payment-info-wrapper ">
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
                className="mt-2 p-2 block w-full border border-gray-300 rounded-md"
                placeholder="jonasrodri123@gmail.com"
              />
            </div>
            <div className="payment-info-wrapper  flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="personal-number"
              >
                Phone Number
              </label>
              <div className="relative">
                <span className="text-gray-500 absolute px-2 top-4 left-2 border-r-1">
                  +62
                </span>
                <input
                  type="tel"
                  name="personal-number"
                  id="personal-number"
                  className="mt-2 pl-17 p-2 block w-full border border-gray-300 rounded-md "
                  placeholder="81445687121"
                />
              </div>
            </div>
          </div>

          {/* <!-- Payment Method --> */}
          <div className="flex flex-col gap-5 ">
            <h1 className="font-semibold text-3xl ">Payment Method</h1>
            <div className="payment-method-wrapper flex flex-wrap  justify-between">
              <button
                type="button"
                value="Gpay"
                className="flex justify-center w-50 p-3 bg-white rounded-md shadow  hover:bg-gray-100"
              >
                <img
                  src="/src/assets/icons/payment-method/googlepay-icon.svg"
                  alt="Google Pay Icon"
                  //   className="w-50]"
                />
              </button>
              <button
                type="button"
                value="VISA"
                className="flex justify-center w-50 p-3 bg-white rounded-md shadow  hover:bg-gray-100"
              >
                <img
                  src="/src/assets/icons/payment-method/visa-icon.svg"
                  alt="Visa Icon"
                  //   className="w-full"
                />
              </button>
              <button
                type="button"
                value="Gopay"
                className="flex justify-center w-50 p-3 bg-white rounded-md shadow hover:bg-gray-100"
              >
                <img
                  src="/src/assets/icons/payment-method/gopay-icon.svg"
                  alt="Gopay Icon"
                  //   className="w-full"
                />
              </button>
              <button
                type="button"
                value="Paypal"
                className="flex justify-center w-50 p-3 bg-white rounded-md shadow hover:bg-gray-100"
              >
                <img
                  src="/src/assets/icons/payment-method/paypal-icon.svg"
                  alt="Paypal Icon"
                  //   className="w-full"
                />
              </button>
              <button
                type="button"
                value="Dana"
                className="flex justify-center w-50 p-3 bg-white rounded-md shadow hover:bg-gray-100"
              >
                <img
                  src="/src/assets/icons/payment-method/dana-icon.svg"
                  alt="Dana Icon"
                  //   className="w-full"
                />
              </button>
              <button
                type="button"
                value="BCA"
                className="flex justify-center w-50 p-3 bg-white rounded-md shadow hover:bg-gray-100"
              >
                <img
                  src="/src/assets/icons/payment-method/bca-icon.svg"
                  alt="BCA Icon"
                  //   className="w-full"
                />
              </button>
              <button
                type="button"
                value="BRI"
                className="flex justify-center w-50 p-3 bg-white rounded-md shadow hover:bg-gray-100"
              >
                <img
                  src="/src/assets/icons/payment-method/bri-icon.svg"
                  alt="BRI Icon"
                  //   className="w-full"
                />
              </button>
              <button
                type="button"
                value="OVO"
                className="flex justify-center w-50 p-3 bg-white rounded-md shadow hover:bg-gray-100"
              >
                <img
                  src="/src/assets/icons/payment-method/ovo-icon.svg"
                  alt="OVO Icon"
                  //   className="w-full"
                />
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
          >
            Pay your order
          </button>
        </form>
      </div>
    </section>
  );
};

export default PaymentPages;
