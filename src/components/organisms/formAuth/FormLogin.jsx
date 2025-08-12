import { useState } from "react";
import { MyButton } from "../../atoms";
import { InputField } from "../../molecules";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../store/slices/authSlice";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();

    const foundUser = userData.find((user) => user.email === email);

    console.log(foundUser);
    if (!foundUser) {
      setErrorMsg("Data tidak ditemukan, Silahkan Mendaftar terlebih dahulu!");
      return;
    }

    if (foundUser.password !== password) {
      setErrorMsg("Username/Password salah!");
      return;
    }

    dispatch(setLogin({ user: foundUser.email, role: foundUser.role }));

    toast.success("Login Berhasil!", {
      position: "top-center",
      autoClose: 1000,
    });

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

        <MyButton type="submit">Login</MyButton>
        <Link to="/auth/register" className="text-right hover:text-blue-800">
          Forgot your password?
        </Link>
      </form>
    </>
  );
};

export default FormLogin;
