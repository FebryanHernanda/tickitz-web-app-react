import { Link } from "react-router-dom";
import { MyButton } from "../../atoms";
import avaProfile from "/src/assets/background/ava-profile.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../store/slices/authSlice";

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

  const handlePropagations = (e) => {
    e.stopPropagation();
  };

  const handleLogout = () => {
    toast.success("Anda Telah berhasil keluar", {
      position: "top-right",
      autoClose: 1000,
    });

    dispatch(setLogout());
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    setIsAdminLoggedIn(false);
    window.location.reload(false);
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
              src={avaProfile}
              alt="Avatar"
              className="h-15 w-15 rounded-full object-cover"
            />
            <span className="text-xs">Hello, {dataUser.email}</span>

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
