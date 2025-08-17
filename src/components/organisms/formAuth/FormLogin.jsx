import { useState } from "react";
import { InputField } from "../../molecules";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../store/slices/authSlice";
import { useResetPassword } from "../../../context";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);
  const { setUserId } = useResetPassword();

  const [isValid, setIsValid] = useState(true);

  /* State Onchange */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = userData.find((user) => user.email === email);

    if (!foundUser) {
      setErrorMsg("Data tidak ditemukan, Silahkan Mendaftar terlebih dahulu!");
      return;
    }

    if (foundUser.password !== password) {
      setErrorMsg("Username/Password salah!");
      return;
    }

    dispatch(setLogin({ user: foundUser, role: foundUser.role }));

    toast.success("Login Berhasil!", {
      position: "top-center",
      autoClose: 1000,
    });

    setIsValid((prev) => !prev);

    if (foundUser.role === "admin") {
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } else {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMsg("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMsg("");
  };

  const handleForgotPassword = () => {
    const foundUser = userData.find((user) => user.email === email);

    if (!foundUser) {
      setErrorMsg("Data tidak ditemukan, Silahkan Mendaftar terlebih dahulu!");
      return;
    }

    setUserId(foundUser.id);
    navigate("/auth/forgot-password");
  };

  return (
    <>
      <p className="text-center text-sm text-red-500">{errorMsg}</p>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          htmlFor="email"
          id="email-login"
          name="email"
          type="email"
          placeholder="Enter your email address!"
          required
          defaultValue={email}
          onChange={handleEmailChange}
        />

        <div className="relative">
          <InputField
            label="Password"
            htmlFor="password"
            id="password-login"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            required
            defaultValue={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="absolute top-9 right-5"
            onClick={togglePassword}
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full rounded-lg border-none p-3 text-white ${!isValid ? "!cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-700 hover:bg-blue-800"}`}
        >
          Login
        </button>

        <div className="flex justify-between">
          <div>
            Don't have an account ?
            <Link
              to="/auth/register"
              className="pl-2 text-right text-blue-700 hover:text-blue-800"
            >
              Register here
            </Link>
          </div>
          <button
            type="button"
            className="text-right text-blue-700 hover:text-blue-800"
            onClick={handleForgotPassword}
          >
            Forgot your password?
          </button>
        </div>
      </form>
    </>
  );
};

export default FormLogin;
