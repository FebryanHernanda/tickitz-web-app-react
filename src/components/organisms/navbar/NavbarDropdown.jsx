import { Link } from "react-router-dom";
import { MyButton } from "../../atoms";
import avaProfile from "/src/assets/background/ava-profile.png";
import { toast } from "react-toastify";

const NavbarDropdown = (props) => {
  const {
    setIsMenuOpen,
    checkUserLogin,
    checkAdminLogin,
    setIsLoggedIn,
    setIsAdminLoggedIn,
    dataUser,
  } = props;

  const handlePropagations = (e) => {
    e.stopPropagation();
  };

  const handleLogout = () => {
    toast.success("Anda Telah berhasil keluar", {
      position: "top-right",
      autoClose: 1000,
    });

    localStorage.removeItem("userData");
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
          <Link className="hover:text-blue-800" to="/">
            Home
          </Link>
          {checkAdminLogin ? (
            <>
              <Link className="hover:text-blue-800" to="/admin">
                Dashboard
              </Link>
              <Link className="hover:text-blue-800" to="/admin/data">
                Movies Data
              </Link>
            </>
          ) : (
            <>
              <Link className="hover:text-blue-800" to="/movies">
                Movies
              </Link>
              <Link className="hover:text-blue-800" to="#">
                Buy Tickets
              </Link>
              <Link className="hover:text-blue-800" to="/profile">
                Profile
              </Link>
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
            <MyButton>
              <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
                Sign In
              </Link>
            </MyButton>
            <MyButton>
              <Link to="/auth/register" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </MyButton>
          </div>
        )}
      </div>
      {/* User Account */}
    </>
  );
};

export default NavbarDropdown;
