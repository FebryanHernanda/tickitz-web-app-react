import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { resetData } from "../../store/slices/userSlice";
import { persistor } from "../../store";
import { jwtDecode } from "jwt-decode";
import { resetDataOrders } from "../../store/slices/orderSlice";

const useTokenAutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;

    try {
      const { exp } = jwtDecode(token);
      const now = Date.now();

      const handleLogout = async () => {
        dispatch(logout());
        dispatch(resetData());
        dispatch(resetDataOrders());
        await persistor.purge();
        navigate("/auth/login", { replace: true });
      };

      if (now / 1000 >= exp) {
        handleLogout();
        return;
      }

      const timeout = setTimeout(
        () => {
          handleLogout();
        },
        exp * 1000 - now,
      );

      return () => clearTimeout(timeout);
    } catch {
      if (token) {
        dispatch(logout());
        dispatch(resetData());
        dispatch(resetDataOrders());
        persistor
          .purge()
          .then(() => navigate("/auth/login", { replace: true }));
      }
    }
  }, [token, dispatch, navigate]);
};

export default useTokenAutoLogout;
