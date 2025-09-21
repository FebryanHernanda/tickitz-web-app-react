import { Link } from "react-router-dom";
import { MyButton } from "../../atoms";
import avaProfile from "/src/assets/background/ava-profile.png";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/slices/authSlice";
import { resetData } from "../../../store/slices/userSlice";
import { persistor } from "../../../store";
import { resetDataOrders } from "../../../store/slices/orderSlice";

const NavbarDropdown = (props) => {
  const {
    setIsMenuOpen,
    checkUserLogin,
    checkAdminLogin,
    setIsLoggedIn,
    setIsAdminLoggedIn,
    dataUser,
  } = props;

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.data);

  const handlePropagations = (e) => {
    e.stopPropagation();
  };

  const handleLogout = (e) => {
    e.preventDefault();
    toast.success("Anda Telah berhasil keluar", {
      position: "top-right",
      autoClose: 1000,
    });

    dispatch(logout());
    dispatch(resetData());
    dispatch(resetDataOrders());
    persistor.purge();

    setIsLoggedIn(false);
    setIsMenuOpen(false);
    setIsAdminLoggedIn(false);
  };

  return (
    <>
      <div
        className="absolute right-5 w-60 rounded-xl border-1 border-gray-300 bg-white p-4 shadow-2xl lg:top-30 lg:right-10 2xl:right-40"
        onClick={handlePropagations}
      >
        {/* Navigation */}
        <div className="flex flex-col gap-4 border-b pb-4">
          <Link
            className="hover:text-blue-800"
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          {checkAdminLogin ? (
            <>
              <Link
                className="hover:text-blue-800"
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                className="hover:text-blue-800"
                to="/admin/data"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies Data
              </Link>
            </>
          ) : (
            <>
              <Link
                className="hover:text-blue-800"
                to="/movies"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
              <Link
                className="hover:text-blue-800"
                to="#"
                onClick={() => setIsMenuOpen(false)}
              >
                Buy Tickets
              </Link>

              {checkUserLogin && (
                <Link
                  className="hover:text-blue-800"
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
              )}
            </>
          )}
        </div>
        {/* Navigation */}

        {/* User Account */}
        {checkUserLogin || checkAdminLogin ? (
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-3">
            <img
              src={
                userData?.data?.image_path
                  ? `http://localhost:8080/public${userData?.data.image_path}`
                  : avaProfile
              }
              className="h-15 w-15 rounded-full object-cover"
            />
            <span className="text-xs">Hello, {dataUser}</span>

            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-blue-700 px-1 py-2 text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            <Link
              to="/auth/login"
              className="w-full rounded-md border-1 border-blue-600 px-3 py-1 text-center text-blue-700 hover:bg-blue-700 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/auth/register"
              className="w-full rounded-md border-1 border-blue-600 bg-blue-600 px-3 py-1 text-center text-white hover:bg-blue-700 hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
      {/* User Account */}
    </>
  );
};

export default NavbarDropdown;
