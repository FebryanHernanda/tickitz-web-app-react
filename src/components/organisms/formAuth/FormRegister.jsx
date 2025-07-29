import { useState } from "react";
import { MyButton } from "../../atoms";
import { InputField } from "../../molecules";

const FormRegister = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkedError, setCheckedError] = useState("");

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
        "Password harus minimal 8 karakter, berisi huruf besar, huruf kecil, dan karakter spesial."
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

      alert("Register dan Login Berhasil!");
      console.log("-----form submitted-----");
      console.log(`Email : ${email}`);
      console.log(`Password : ${password}`);

      /* Set Data Storage */
      localStorage.setItem("userData", jsonString);
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
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
        <p className="text-red-500 text-sm">{emailError}</p>
        <InputField
          label="Password"
          htmlFor="password"
          id="password-register"
          name="password"
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={handlePasswordChange}
        />
        <p className="text-red-500 text-sm">{passwordError}</p>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="termsNconditions"
            id="termsNconditions"
            className="rounded-md border-gray-300 cursor-pointer"
            checked={checked}
            onChange={handleCheckedChange}
          />
          <label htmlFor="termsNconditions" className="text-sm cursor-pointer">
            I agree to terms & conditions
          </label>
        </div>
        <p className="text-red-500 text-sm">{checkedError}</p>

        <MyButton type="submit">Sign Up</MyButton>
      </form>
    </>
  );
};

export default FormRegister;
