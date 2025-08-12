import { useState } from "react";
import { MyButton } from "../../atoms";
import { InputField } from "../../molecules";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../store/slices/userSlice";

const FormRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState("");

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{8,}$/;
    const checkUser = userData.find((data) => data.email === email);

    // Validate Email
    if (!email) return setEmailError("Kolom Email tidak boleh kosong!");
    if (!emailPattern.test(email))
      return setEmailError("Format email tidak valid!");
    if (checkUser) return setEmailError("Email telah digunakan!");
    setEmailError("");

    // Validate Password
    if (!password)
      return setPasswordError("Kolom Password tidak boleh kosong!");
    if (!passPattern.test(password))
      return setPasswordError(
        "Password harus minimal 8 karakter, berisi huruf besar, huruf kecil, dan karakter spesial.",
      );
    setPasswordError("");

    // Validate Checkbox
    if (!checked)
      return setCheckedError("Pastikan anda telah menyetujui persyaratan!");
    setCheckedError("");

    const user = {
      id: userData.length + 1,
      email,
      password,
      role: "user",
    };

    toast.success("Register Berhasil!", {
      position: "top-center",
      autoClose: 1000,
    });
    dispatch(addUser(user));

    setTimeout(() => navigate("/auth/login"), 2000);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleCheckedChange = (e) => {
    setChecked(e.target.checked);
    setCheckedError("");
  };

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          htmlFor="email"
          id="email-register"
          name="email"
          type="email"
          placeholder="Enter your email address!"
          required
          defaultValue={email}
          onChange={handleEmailChange}
        />
        <p className="text-sm text-red-500">{emailError}</p>
        <div className="relative">
          <InputField
            label="Password"
            htmlFor="password"
            id="password-register"
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
        <p className="text-sm text-red-500">{passwordError}</p>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="termsNconditions"
            id="termsNconditions"
            className="cursor-pointer rounded-md border-gray-300"
            checked={checked}
            onChange={handleCheckedChange}
          />
          <label htmlFor="termsNconditions" className="cursor-pointer text-sm">
            I agree to terms & conditions
          </label>
        </div>
        <p className="text-sm text-red-500">{checkedError}</p>

        <MyButton type="submit">Join For Free Now</MyButton>

        <div className="my-5 text-center">
          Already have an account? {""}
          <Link
            to={"/auth/login"}
            className="cursor-pointer hover:text-blue-800 hover:underline"
          >
            Log In
          </Link>
        </div>
      </form>
    </>
  );
};

export default FormRegister;
