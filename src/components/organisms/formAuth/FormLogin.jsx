import { useState } from "react";
import { MyButton } from "../../atoms";
import { InputField } from "../../molecules";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";

const FormLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
    let isValid = true;

    if (!userData) {
      isValid = false;
      toast.error("Data tidak ditemukan!", {
        position: "top-center",
        autoClose: 3000,
      });
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
      toast.success("Login Berhasil!", {
        position: "top-center",
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
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
        <p className="text-sm text-red-500">{emailError}</p>
        <div className="relative">
          <InputField
            label="Password"
            htmlFor="password"
            id="password-login"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="absolute top-9 right-5"
            onClick={togglePassword}
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            {/* <Eye size={20} /> */}
          </button>
        </div>
        <p className="text-sm text-red-500">{passwordError}</p>

        <MyButton type="submit">Login</MyButton>
        <Link to="/auth/register" className="text-right hover:text-blue-800">
          Forgot your password?
        </Link>
      </form>
    </>
  );
};

export default FormLogin;
