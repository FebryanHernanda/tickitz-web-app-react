import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyButton } from "../../atoms";
import { Menu, Search, X } from "lucide-react";
import avaProfile from "/src/assets/background/ava-profile.png";
import NavbarDropdown from "./NavbarDropdown";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dataStorage = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    if (dataStorage) {
      setIsLoggedIn(true);
    }
  }, [dataStorage]);

  return (
    <header className="relative z-50 bg-white shadow-md">
      <div className="mx-auto max-w-screen-2xl p-5 lg:p-10">
        <div className="flex items-center justify-between">
          <img
            src="/src/assets/icons/logo/tickitz-logo-blue.svg"
            alt="Tickitz Logo"
          />

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-5 lg:flex">
            <Link className="hover:text-blue-800" to="/">
              Home
            </Link>
            <Link className="hover:text-blue-800" to="/movies">
              Movies
            </Link>
            <Link className="hover:text-blue-800" to="#">
              Buy Tickets
            </Link>
          </nav>

          {/* Desktop isLoggedin */}
          <div className="hidden items-center gap-5 lg:flex">
            {isLoggedIn ? (
              <div className="flex items-center gap-5">
                <span className="text-sm">Hello, {dataStorage.email}</span>
                <Search />
                <img
                  src={avaProfile}
                  alt="Avatar"
                  className="h-15 w-15 cursor-pointer rounded-full object-cover"
                  onClick={handleMenuToggle}
                />
              </div>
            ) : (
              <>
                <MyButton>
                  <Link to="/auth/login">Sign In</Link>
                </MyButton>
                <MyButton>
                  <Link to="/auth/register">Sign Up</Link>
                </MyButton>
              </>
            )}
          </div>

          {/* Hamburger Menu */}
          <button className="lg:hidden" onClick={handleMenuToggle}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Open */}
        {isMenuOpen && (
          <NavbarDropdown
            setIsMenuOpen={setIsMenuOpen}
            checkLogin={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            dataUser={dataStorage}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
