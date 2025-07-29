import { MyButton } from "../../atoms";
import { InputField } from "../../molecules";

const FormLogin = () => {
  return (
    <>
      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("Masuk Form Login");
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

        <MyButton type="submit">Login</MyButton>
        <a href="#" className="text-right">
          Forgot your password?
        </a>
      </form>
    </>
  );
};

export default FormLogin;
