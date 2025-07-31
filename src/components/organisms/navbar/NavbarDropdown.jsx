import { Link } from "react-router-dom";
import { MyButton } from "../../atoms";

const NavbarDropdown = (props) => {
  const { setIsMenuOpen, isLoggedin, setIsLoggedIn, dataUser } = props;

  return (
    <>
      <div className="absolute top-20 right-5 w-50 rounded-xl border-1 border-gray-300 bg-white p-4 shadow-2xl">
        <div className="flex flex-col gap-4 border-b pb-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/movies" onClick={() => setIsMenuOpen(false)}>
            Movies
          </Link>
          <Link to="#" onClick={() => setIsMenuOpen(false)}>
            Buy Tickets
          </Link>
        </div>

        {isLoggedin ? (
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
        ) : (
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-3">
            <img
              src="https://yt3.googleusercontent.com/ytc/AIdro_mjPRmeiO8D9TtnHuhQyeSetpC7X4KvMTiu96PhgQ1SZAc=s160-c-k-c0x00ffffff-no-rj"
              alt="Avatar"
              className="h-15 w-15 rounded-full object-cover"
            />
            <span className="text-sm">Hello, {dataUser.email}</span>

            <button
              onClick={() => {
                localStorage.removeItem("userData");
                setIsLoggedIn(false);
                setIsMenuOpen(false);
              }}
              className="w-full rounded-xl bg-blue-700 px-1 py-2 text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NavbarDropdown;
