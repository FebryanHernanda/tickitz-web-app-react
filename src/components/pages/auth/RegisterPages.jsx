import { Circle, Line } from "../../atoms";
import { ButtonSocialMedia } from "../../molecules";
import { FormRegister } from "../../organisms";

const RegisterPages = () => {
  return (
    <>
      <div className="flex flex-col gap-5 rounded-2xl bg-white p-7 md:w-[600px] lg:p-10">
        <div className="flex items-center justify-between gap-1">
          <Circle name="Fill Form" color="bg-blue-700" width="w-17">
            1
          </Circle>
          <Line />
          <Circle name="Activate" color="bg-gray-400">
            2
          </Circle>
          <Line />
          <Circle name="Done" color="bg-gray-400">
            3
          </Circle>
        </div>

        <FormRegister />

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

export default RegisterPages;
