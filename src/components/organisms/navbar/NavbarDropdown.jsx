import { Link } from "react-router-dom";
import { MyButton } from "../../atoms";

const NavbarDropdown = (props) => {
  const { setIsMenuOpen, checkLogin, setIsLoggedIn, dataUser } = props;

  const listLogin = [
    { name: "Home", path: "/" },
    {
      name: "Movies",
      path: "/movies",
    },
    {
      name: "Buy Tickets",
      path: "/movies",
    },
    {
      name: "Profile",
      path: "/profile",
    },
  ];

  return (
    <>
      <div className="absolute right-5 w-50 rounded-xl border-1 border-gray-300 bg-white p-4 shadow-2xl lg:top-30 lg:right-10 2xl:right-40">
        {/* Navigation */}
        <div className="flex flex-col gap-4 border-b pb-4">
          {checkLogin
            ? listLogin.map((item, id) => (
                <Link
                  key={id}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))
            : listLogin.slice(0, 3).map((item, id) => (
                <Link
                  key={id}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
        </div>
        {/* Navigation */}

        {/* User Account */}
        {checkLogin ? (
          <div className="mt-4 flex w-full flex-col items-center justify-center gap-3">
            <img
              src="/src/assets/background/ava-profile.png"
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
