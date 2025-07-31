import { useState } from "react";
import { MyButton } from "../../atoms";
import { InputField } from "../../molecules";
import { Link } from "react-router-dom";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem("userData"));
    let isValid = true;

    if (!userData) {
      isValid = false;
      alert("Data tidak ditemukan!");
    } else {
      if (email !== userData.email) {
        isValid = false;
        setEmailError("Email tidak cocok!");
      } else {
        setEmailError("");
      }

      if (password !== userData.password) {
        isValid = false;
        setPasswordError("Password tidak cocok!");
      } else {
        setPasswordError("");
      }
    }

    if (isValid) {
      alert("Login Berhasil!");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          htmlFor="email"
          id="email-login"
          name="email"
          type="email"
          placeholder="Enter your email address!"
          required
          value={email}
          onChange={handleEmailChange}
        />
        <p className="text-red-500 text-sm">{emailError}</p>
        <InputField
          label="Password"
          htmlFor="password"
          id="password-login"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <p className="text-red-500 text-sm">{passwordError}</p>

        <MyButton type="submit">Login</MyButton>
        <Link to="/auth/register">Forgot your password?</Link>
      </form>
    </>
  );
};

export default FormLogin;
