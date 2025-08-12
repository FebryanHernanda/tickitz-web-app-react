import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ roles = "user" }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  if (role !== roles) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
