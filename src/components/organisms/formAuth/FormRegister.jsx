import { useState } from "react";
import { MyButton } from "../../atoms";
import { InputField } from "../../molecules";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

const FormRegister = () => {
  const navigate = useNavigate();

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

    let isValid = true;

    if (!email) {
      isValid = false;
      setEmailError("Kolom Email tidak boleh kosong!");
    } else if (!emailPattern.test(email)) {
      isValid = false;
      setEmailError("Format email tidak valid!");
    } else {
      setEmailError("");
    }

    if (!password) {
      isValid = false;
      setPasswordError("Kolom Password tidak boleh kosong!");
    } else if (!passPattern.test(password)) {
      isValid = false;
      setPasswordError(
        "Password harus minimal 8 karakter, berisi huruf besar, huruf kecil, dan karakter spesial.",
      );
    } else {
      setPasswordError("");
    }

    if (!checked) {
      isValid = false;
      setCheckedError("Pastikan anda telah menyetujui persyaratan!");
    } else {
      setCheckedError("");
    }

    if (isValid) {
      const user = {
        email,
        password,
      };

      const jsonString = JSON.stringify(user);

      alert("Register Berhasil");

      /* Set Data Storage */
      localStorage.setItem("userData", jsonString);

      navigate("/auth/login");
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
          value={email}
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
            value={password}
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
