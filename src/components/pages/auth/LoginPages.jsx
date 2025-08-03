import { ButtonSocialMedia } from "../../molecules";
import { FormLogin } from "../../organisms";

const LoginPages = () => {
  return (
    <>
      <div className="flex flex-col gap-5 rounded-2xl bg-white p-7 md:w-[600px] lg:p-10">
        <h1 className="text-3xl">Welcome Back👋</h1>
        <h3 className="text-gray-500">
          Sign in with your data that you entered during your registration
        </h3>

        <FormLogin />

        <div className="flex items-center gap-5">
          <div className="h-[1px] w-full bg-gray-300"></div>
          <h3>Or</h3>
          <div className="h-[1px] w-full bg-gray-300"></div>
        </div>

        <ButtonSocialMedia />
      </div>
    </>
  );
};

export default LoginPages;
