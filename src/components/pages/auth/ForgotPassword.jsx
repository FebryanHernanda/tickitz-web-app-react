import { ArrowBigLeft } from "lucide-react";
import { ButtonSocialMedia } from "../../molecules";
import { FormForgotPass } from "../../organisms";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <div className="flex flex-col gap-5 rounded-2xl bg-white p-7 md:w-[550px] lg:p-10">
        <h1 className="text-3xl">Reset Password</h1>
        <h3 className="text-gray-500">
          Enter and confirm your new password to complete the reset process.
        </h3>

        <FormForgotPass />

        <Link
          to="/auth/login"
          className="-mt-5 cursor-pointer text-center text-gray-500 hover:text-blue-600"
        >
          Back to Login
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
