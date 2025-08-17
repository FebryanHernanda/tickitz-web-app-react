import { useEffect, useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { InputField } from "../../molecules";
import { useNavigate } from "react-router-dom";
import { passPattern } from "../../../utils/regex";
import { useDispatch } from "react-redux";
import { useResetPassword } from "../../../context";
import { toast } from "react-toastify";
import { resetPassword } from "../../../store/slices/userSlice";

const FormForgotPass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useResetPassword();

  const [showPassword, setShowPassword] = useState("");
  const [isValid, setIsValid] = useState("false");
  const [showConfirmPassword, setShowConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState({});

  useEffect(() => {
    if (!userId) {
      navigate("/auth/login");
    }
  }, [userId, navigate]);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPass = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorMsg("");
  };

  const validate = () => {
    const newErrors = {};
    let password;

    if (!formData.newPassword.trim() && !formData.confirmPassword.trim()) {
      newErrors.password = "Kolom tidak boleh kosong!";
    } else {
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.newPassword = "Password tidak sama!";
      } else {
        password = formData.newPassword;
        if (!passPattern.test(password)) {
          newErrors.password =
            "Password harus minimal 8 karakter, berisi huruf besar, huruf kecil, dan karakter spesial";
        } else {
          formData.password = password;
        }
      }
    }

    setErrorMsg(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setIsValid((prev) => !prev);
      toast.success("Reset Password Berhasil!", {
        position: "top-center",
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);

      dispatch(
        resetPassword({
          userId: userId,
          formData,
        }),
      );
    }
  };

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="relative flex flex-col gap-3">
          <InputField
            label="New Password"
            htmlFor="newPasswrd"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute top-12 right-4"
            onClick={togglePassword}
          >
            {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <p className="-mt-3 text-sm text-red-500">{errorMsg.password}</p>

        <div className="relative flex flex-col gap-3">
          <InputField
            label="Confirm New Password"
            htmlFor="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute top-12 right-4"
            onClick={toggleConfirmPass}
          >
            {showConfirmPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <p className="-mt-3 text-sm text-red-500">{errorMsg.password}</p>

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full rounded-lg border-none p-3 text-white ${!isValid ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-700 hover:bg-blue-800"}`}
        >
          Change Password
        </button>
      </form>
      <p className="text-center text-sm text-red-500">{errorMsg.newPassword}</p>
    </>
  );
};

export default FormForgotPass;
