import { useEffect, useState } from "react";
import { Circle, Line } from "../../atoms";
import { ModalPayment } from "../../molecules";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

import gpayIcon from "/src/assets/icons/payment-method/googlepay-icon.svg";
import visaIcon from "/src/assets/icons/payment-method/visa-icon.svg";
import gopayIcon from "/src/assets/icons/payment-method/gopay-icon.svg";
import paypalIcon from "/src/assets/icons/payment-method/paypal-icon.svg";
import danaIcon from "/src/assets/icons/payment-method/dana-icon.svg";
import bcaIcon from "/src/assets/icons/payment-method/bca-icon.svg";
import briIcon from "/src/assets/icons/payment-method/bri-icon.svg";
import ovoIcon from "/src/assets/icons/payment-method/ovo-icon.svg";
import { emailPattern, phoneNumberPattern } from "../../../utils/regex";
import { editUser } from "../../../store/slices/userSlice";

const PaymentPages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  /* Get UserData */
  const userData = useSelector((state) => state.auth.user);

  /* State */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [payment, setPayment] = useState("");
  const [errorMsg, setErrorMsg] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: userData?.email,
    phoneNumber: "",
    paymentMethod: "",
  });

  /* Check payment state for paymentmethod */
  useEffect(() => {
    if (payment) {
      setFormData((prev) => ({
        ...prev,
        paymentMethod: payment,
      }));
    }
  }, [payment]);

  /* Check if location state null back to home */
  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  if (!location.state) return null;

  const { details, time, dateShow, cinema, seat } = location.state;

  /* count Price */
  const countPrices = () => {
    const price = seat.length * 10;
    return `$ ${price}`;
  };

  /* Check form valid */
  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== "",
  );

  /* Handle controlled input */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMsg({});
  };

  const validate = () => {
    const newErrors = {};
    let personalNumber;

    /* ======================================Validate Fullname Field====================================== */
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Kolom tidak boleh kosong!";
    }

    /* ======================================Validate Email====================================== */
    if (!formData.email.trim()) {
      newErrors.email = "Kolom tidak boleh kosong!";
    } else {
      if (!emailPattern.test(formData.email)) {
        newErrors.email = "Format email tidak valid!";
      }
    }

    /* ======================================Validate Phone Number====================================== */
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Kolom tidak boleh kosong!";
    } else {
      personalNumber = formData.phoneNumber.startsWith("62")
        ? formData.phoneNumber
        : `62${formData.phoneNumber}`;
      if (!phoneNumberPattern.test(personalNumber)) {
        newErrors.phoneNumber =
          "Format tidak valid! Maksimal 13 karakter dan tidak diawali dengan 0. Contoh: 81345678991";
      } else {
        formData.phoneNumber = personalNumber;
      }
    }

    setErrorMsg(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* Handle Form */
  const handleForm = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("berhasil di input ", formData);
      dispatch(editUser({ userId: userData.id, formData }));
      setIsModalOpen(true);
    }
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
                name="fullName"
                id="personal-name"
                className="mt-2 block w-full rounded-md border border-gray-300 p-2"
                placeholder="Jonas El Rodriguez"
                defaultValue={formData.fullName}
                onChange={handleChange}
              />
              {errorMsg.fullName && (
                <p className="text-sm text-red-500">{errorMsg.fullName}</p>
              )}
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
                name="email"
                id="personal-email"
                className="mt-2 block w-full rounded-md border border-gray-300 p-2"
                placeholder={userData.email}
                defaultValue={formData.email}
                onChange={handleChange}
              />
              {errorMsg.email && (
                <p className="text-sm text-red-500">{errorMsg.email}</p>
              )}
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
                  name="phoneNumber"
                  id="personal-number"
                  className="mt-2 block w-full rounded-md border border-gray-300 p-2 pl-17"
                  placeholder="81445687121"
                  defaultValue={formData.phoneNumber}
                  onChange={handleChange}
                />
                {errorMsg.phoneNumber && (
                  <p className="text-sm text-red-500">{errorMsg.phoneNumber}</p>
                )}
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
            className={`w-full rounded-md bg-blue-600 p-3 text-white shadow hover:bg-blue-700 ${!isFormValid ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-700 hover:bg-blue-800"}`}
            disabled={!isFormValid}
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
        onClose={setIsModalOpen}
        paymentMethod={payment}
      />
    </section>
  );
};

export default PaymentPages;
