import { AuthLayout } from "../../../layouts";
import { ButtonSocialMedia } from "../../molecules";
import { FormLogin } from "../../organisms";

const LoginPages = () => {
  return (
    <AuthLayout>
      <div className=" flex flex-col gap-5 bg-white p-7 rounded-2xl lg:p-10">
        <h1 className="text-3xl">Welcome Back👋</h1>
        <h3 className="text-gray-500">
          Sign in with your data that you entered during your registration
        </h3>

        <FormLogin />

        <div className="flex items-center gap-5">
          <div className="w-full h-[1px] bg-gray-300"></div>
          <h3>Or</h3>
          <div className="w-full h-[1px] bg-gray-300"></div>
        </div>

        <ButtonSocialMedia />
      </div>
    </AuthLayout>
  );
};

export default LoginPages;
