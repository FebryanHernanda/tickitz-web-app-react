import { AuthLayout } from "../../../layouts";
import { ButtonSocialMedia } from "../../molecules";
import { FormRegister, StepProgress } from "../../organisms";

const RegisterPages = () => {
  return (
    <AuthLayout>
      <div className=" flex flex-col gap-5 bg-white p-7 rounded-2xl lg:p-10">
        <StepProgress />
        <FormRegister />

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

export default RegisterPages;
