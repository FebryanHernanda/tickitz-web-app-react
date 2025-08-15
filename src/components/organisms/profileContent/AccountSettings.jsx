import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emailPattern,
  passPattern,
  phoneNumberPattern,
} from "../../../utils/regex";
import { toast } from "react-toastify";
import { editUser } from "../../../store/slices/userSlice";

const AccountSettings = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);

  const [errorMsg, setErrorMsg] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const foundUser = userData.find((data) => data.id === user.id);

    const splitName = foundUser.fullName.trim().split(" ");
    const firstName = splitName.shift();
    const lastName = splitName.join(" ");

    setCurrentUser(foundUser);
    setFirstName(firstName);
    setLastName(lastName);
  }, [userData, user, setCurrentUser, setFirstName, setLastName]);

  /* Check if CurrentUser have data change */
  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        phoneNumber: currentUser?.phoneNumber || "",
        email: currentUser?.email || "",
        newPassword: currentUser?.password || "",
        confirmPassword: currentUser?.password || "",
      });
    }
  }, [currentUser, firstName, lastName]);

  /* Check form valid */
  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== "",
  );

  /* Check previous value  */
  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMsg({});
  };

  const validateInput = () => {
    const newErrors = {};
    let personalNumber;
    let password;

    /* ======================================Validate Fullname Field====================================== */
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Kolom tidak boleh kosong!";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Kolom tidak boleh kosong!";
    }

    /* ======================================Validate Email====================================== */
    if (!formData.email.trim()) {
      newErrors.email = "Kolom tidak boleh kosong!";
    }
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Format email tidak valid!";
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

    /* ======================================Validate Password====================================== */

    if (!formData.newPassword.trim() && !formData.confirmPassword.trim()) {
      newErrors.password = "Kolom tidak boleh kosong!";
    } else {
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.password = "Password tidak sama!";
      } else {
        password = formData.newPassword;
        if (!passPattern.test(password)) {
          newErrors.password =
            "Password harus minimal 8 karakter, berisi huruf besar, huruf kecil, dan karakter spesial";
        } else {
          formData.password = password;
        }
      }
    }

    setErrorMsg(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateInput()) {
      toast.success("Data berhasil diubah!", {
        position: "top-center",
        autoClose: 1000,
      });

      dispatch(
        editUser({
          userId: currentUser.id,
          formData,
        }),
      );
    }
  };

  return (
    <>
      <form
        className="flex h-full flex-col justify-between gap-[40px]"
        onSubmit={handleSubmit}
      >
        {/* <!-- Container Account settings --> */}
        <div className="relative flex flex-col gap-[30px] overflow-hidden rounded-[24px] bg-white p-[30px]">
          <h1 className="text-medium font-light">Account Settings</h1>
          <hr />
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[50px] max-[640px]:flex-wrap max-[640px]:gap-[20px]">
              <div className="relative flex w-full flex-col gap-[10px]">
                <label htmlFor="firstName ">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Jonas"
                  className="rounded-[16px] border-[1px] border-gray-400 bg-[#fcfdfe] p-[15px]"
                  defaultValue={formData.firstName}
                  onChange={handleInput}
                />
                {errorMsg.firstName && (
                  <p className="text-sm text-red-500">{errorMsg.firstName}</p>
                )}
              </div>
              <div className="flex w-full flex-col gap-[10px]">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="El Rodriguez"
                  className="rounded-[16px] border-[1px] border-gray-400 bg-[#fcfdfe] p-[15px]"
                  defaultValue={formData.lastName}
                  onChange={handleInput}
                />
                {errorMsg.lastName && (
                  <p className="text-sm text-red-500">{errorMsg.lastName}</p>
                )}
              </div>
            </div>
            <div className="flex gap-[50px] max-[640px]:flex-wrap max-[640px]:gap-[20px]">
              <div className="flex w-full flex-col gap-[10px]">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  placeholder="jonasrodrigu123@gmail.com"
                  className="rounded-[16px] border-[1px] border-gray-400 bg-[#fcfdfe] p-[15px]"
                  defaultValue={formData.email}
                  onChange={handleInput}
                />
                {errorMsg.email && (
                  <p className="text-sm text-red-500">{errorMsg.email}</p>
                )}
              </div>
              <div className="flex w-full flex-col gap-[10px]">
                <div className="relative flex flex-col gap-[10px]">
                  <span className="absolute bottom-[6px] left-[10px] border-r-[0.5px] border-gray-400 p-[10px] text-gray-400">
                    +62
                  </span>
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="81445687121"
                    className="rounded-[16px] border-[1px] border-gray-400 bg-[#fcfdfe] p-[15px] pl-[70px]"
                    defaultValue={formData.phoneNumber.substring(2)}
                    onChange={handleInput}
                  />
                </div>
                {errorMsg.phoneNumber && (
                  <p className="text-sm text-red-500">{errorMsg.phoneNumber}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Container Account settings --> */}

        {/* <!-- Container Privacy Account settings --> */}
        <div className="flex flex-col gap-[30px] overflow-hidden rounded-[24px] bg-white p-[30px]">
          <h1 className="text-medium font-light">Account and Privacy</h1>
          <hr />
          <div className="flex flex-col gap-[20px]">
            <div className="flex gap-[50px] max-[640px]:flex-wrap max-[640px]:gap-[20px]">
              <div className="relative flex w-full flex-col gap-[10px]">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Write your password"
                  className="rounded-[16px] border-[1px] border-gray-400 bg-white p-[15px]"
                  defaultValue={currentUser.password}
                  onChange={handleInput}
                />
                <button
                  type="button"
                  className="absolute top-13 right-5"
                  onClick={togglePassword}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>
              <div className="relative flex w-full flex-col gap-[10px]">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="rounded-[16px] border-[1px] border-gray-400 bg-white p-[15px]"
                  defaultValue={currentUser.password}
                  onChange={handleInput}
                />
                <button
                  type="button"
                  className="absolute top-13 right-5"
                  onClick={toggleConfirmPassword}
                >
                  {showConfirmPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>
            </div>
            {errorMsg.password && (
              <p className="text-center text-sm text-red-500">
                {errorMsg.password}
              </p>
            )}
          </div>
        </div>
        {/* <!-- Container Privacy Account settings --> */}
        <button
          type="submit"
          className={`w-[400px] rounded-[16px] border-none p-[20px] text-white max-[1025px]:w-full ${!isFormValid ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-700 hover:bg-blue-800"}`}
          disabled={!isFormValid}
        >
          Update Changes
        </button>
      </form>
    </>
  );
};

export default AccountSettings;
