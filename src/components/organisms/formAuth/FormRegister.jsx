import { MyButton } from "../../atoms";
import { InputField } from "../../molecules";

const FormRegister = () => {
  return (
    <>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Masuk Form Register");
        }}
      >
        <InputField
          label="Email"
          htmlFor="email"
          id="email-login"
          name="email"
          type="email"
          placeholder="Enter your email address!"
          required
        />
        <InputField
          label="Password"
          htmlFor="password"
          id="password-login"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="termsNconditions"
            id="termsNconditions"
            className="rounded-md border-gray-300 cursor-pointer"
          />
          <label htmlFor="termsNconditions" className="text-sm cursor-pointer">
            I agree to terms & conditions
          </label>
        </div>

        <MyButton type="submit">Sign Up</MyButton>
      </form>
    </>
  );
};

export default FormRegister;
