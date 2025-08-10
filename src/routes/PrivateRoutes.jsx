import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = ({ role = "user" }) => {
  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    return <Navigate to="/" />;
  }
  if (user.role !== role) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
