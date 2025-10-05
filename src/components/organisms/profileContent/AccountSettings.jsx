import { Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  emailPattern,
  passPattern,
  phoneNumberPattern,
} from "../../../utils/regex";
import { toast } from "react-toastify";
import {
  getProfile,
  updatePassword,
  updateProfile,
} from "../../../store/slices/userSlice";

const AccountSettings = ({ fileInputRef, onFileChange }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  const [errorMsg, setErrorMsg] = useState({});

  const [reloadData, setReloadData] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    avatarPath: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, reloadData]);

  /* Check if CurrentUser have data change */
  useEffect(() => {
    setFormData({
      firstName: userData?.data.first_name || "",
      lastName: userData?.data.last_name || "",
      phoneNumber: userData?.data.phone_number || "",
      email: userData?.data.email || "",
    });
  }, [userData]);

  /* Check form valid */
  const isFormValid = Object.values(formData).every((value) => {
    if (typeof value === "string") {
      return value.trim() !== "";
    }
    if (value instanceof File) {
      return value !== null;
    }
    return false;
  });

  const isFormPassValid = Object.values(passwordData).every(
    (value) => value.trim() !== "",
  );

  /* Check previous value  */
  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleNewPassword = () => setNewPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleInput = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));

    setErrorMsg({});
  };

  const handleInputPassword = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMsg({});
  };

  const validateInput = () => {
    const newErrors = {};
    let personalNumber;

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

    setErrorMsg(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateInputPassword = () => {
    const newErrors = {};

    if (
      !passwordData.oldPassword.trim() &&
      !passwordData.newPassword.trim() &&
      !passwordData.confirmNewPassword.trim()
    ) {
      newErrors.password = "Kolom tidak boleh kosong!";
    } else {
      if (!passPattern.test(passwordData.newPassword)) {
        newErrors.password =
          "Password harus minimal 8 karakter, berisi huruf besar, huruf kecil, dan karakter spesial";
      }

      if (passwordData.newPassword !== passwordData.confirmNewPassword) {
        newErrors.confirmPassword = "Konfirmasi password tidak cocok!";
      }
    }

    setErrorMsg(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();

    const formDataPayload = new FormData();
    formDataPayload.append("first_name", formData.firstName);
    formDataPayload.append("last_name", formData.lastName);
    formDataPayload.append("phone_number", formData.phoneNumber);
    formDataPayload.append("email", formData.email);
    formDataPayload.append("image", formData.avatarPath);

    if (validateInput()) {
      try {
        await dispatch(updateProfile(formDataPayload)).unwrap();
        toast.success("Data profile berhasil diubah!", {
          position: "top-center",
          autoClose: 1000,
        });

        setReloadData((prev) => !prev);
      } catch (error) {
        toast.error(error || "update profile gagal", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();

    if (validateInputPassword()) {
      try {
        await dispatch(updatePassword(passwordData)).unwrap();
        toast.success("Data berhasil diubah!", {
          position: "top-center",
          autoClose: 1000,
        });

        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });

        setReloadData((prev) => !prev);
      } catch (error) {
        toast.error(error || "update password gagal", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    }
  };

  return (
    <>
      <form className="flex h-full flex-col justify-between gap-[40px]">
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
            <div className="flex w-full flex-col gap-[10px]">
              <input
                type="file"
                name="avatarPath"
                ref={fileInputRef}
                className="hidden cursor-pointer rounded-[16px] border-[1px] border-gray-400 bg-[#fcfdfe] p-[15px]"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  handleInput(e);
                  if (file) {
                    onFileChange(file);
                  }
                }}
              />

              {errorMsg.avatar && (
                <p className="text-sm text-red-500">{errorMsg.avatar}</p>
              )}
            </div>
          </div>
        </div>
        {/* <!-- Container Account settings --> */}

        <button
          type="submit"
          className={`w-[400px] rounded-[16px] border-none p-[20px] text-white max-[1025px]:w-full ${!isFormValid ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-700 hover:bg-blue-800"}`}
          disabled={!isFormValid}
          onClick={handleSubmitProfile}
        >
          Update Changes
        </button>

        {/* <!-- Container Privacy Account settings --> */}
        <div className="flex flex-col gap-[30px] overflow-hidden rounded-[24px] bg-white p-[30px]">
          <h1 className="text-medium font-light">Account and Privacy</h1>
          <hr />
          <div className="flex flex-col gap-[20px]">
            <div className="flex flex-col gap-[50px] max-[640px]:flex-wrap max-[640px]:gap-[20px]">
              <div className="relative flex w-full flex-col gap-[10px]">
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="oldPassword"
                  placeholder="Write your password"
                  className="rounded-[16px] border-[1px] border-gray-400 bg-white p-[15px]"
                  value={passwordData.oldPassword || ""}
                  onChange={handleInputPassword}
                />
                <button
                  type="button"
                  className="absolute top-13 right-5"
                  onClick={togglePassword}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>
              <div className="flex gap-5">
                <div className="relative flex w-full flex-col gap-[10px]">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    placeholder="Confirm your password"
                    className="rounded-[16px] border-[1px] border-gray-400 bg-white p-[15px]"
                    value={passwordData.newPassword || ""}
                    onChange={handleInputPassword}
                  />
                  <button
                    type="button"
                    className="absolute top-13 right-5"
                    onClick={toggleNewPassword}
                  >
                    {showConfirmPassword ? <EyeClosed /> : <Eye />}
                  </button>
                </div>
                <div className="relative flex w-full flex-col gap-[10px]">
                  <label htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    placeholder="Confirm your new password"
                    className="rounded-[16px] border-[1px] border-gray-400 bg-white p-[15px]"
                    value={passwordData.confirmNewPassword || ""}
                    onChange={handleInputPassword}
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
            </div>
            {errorMsg.password ? (
              <p className="text-center text-sm text-red-500">
                {errorMsg.password}
              </p>
            ) : errorMsg.confirmPassword ? (
              <p className="text-center text-sm text-red-500">
                {errorMsg.confirmPassword}
              </p>
            ) : null}
          </div>
        </div>
        {/* <!-- Container Privacy Account settings --> */}
        <button
          type="submit"
          className={`w-[400px] rounded-[16px] border-none p-[20px] text-white max-[1025px]:w-full ${!isFormPassValid ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-700 hover:bg-blue-800"}`}
          disabled={!isFormPassValid}
          onClick={handleSubmitPassword}
        >
          Update Changes
        </button>
      </form>
    </>
  );
};

export default AccountSettings;
