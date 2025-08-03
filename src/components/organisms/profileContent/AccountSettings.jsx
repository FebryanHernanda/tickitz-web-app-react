import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const AccountSettings = () => {
  const [showPassword, setShowPassword] = useState(false);

  /* Check previous value  */
  const togglePassword = () => setShowPassword((prev) => !prev);

  /* Handle AccountSettings form */
  const handleAccountSettings = (e) => {
    e.preventDefault();

    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      alert("Password does not match");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    userData.password = confirmPassword;
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  return (
    <>
      <form
        className="flex h-full flex-col justify-between gap-[40px]"
        onSubmit={handleAccountSettings}
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
                />
              </div>
              <div className="flex w-full flex-col gap-[10px]">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="El Rodriguez"
                  className="rounded-[16px] border-[1px] border-gray-400 bg-[#fcfdfe] p-[15px]"
                />
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
                />
              </div>
              <div className="relative flex w-full flex-col gap-[10px]">
                <span className="absolute bottom-[6px] left-[10px] border-r-[0.5px] border-gray-400 p-[10px] text-gray-400">
                  +62
                </span>
                <label htmlFor="personalNumber">Phone Number</label>
                <input
                  type="tel"
                  name="personalNumber"
                  placeholder="81445687121"
                  className="rounded-[16px] border-[1px] border-gray-400 bg-[#fcfdfe] p-[15px] pl-[70px]"
                />
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
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="rounded-[16px] border-[1px] border-gray-400 bg-white p-[15px]"
                />
                <button
                  type="button"
                  className="absolute top-13 right-5"
                  onClick={togglePassword}
                >
                  {showPassword ? <EyeClosed /> : <Eye />}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Container Privacy Account settings --> */}
        <button
          type="submit"
          className="w-[400px] rounded-[16px] border-none bg-blue-700 p-[20px] text-white max-[1025px]:w-full"
        >
          Update Changes
        </button>
      </form>
    </>
  );
};

export default AccountSettings;
