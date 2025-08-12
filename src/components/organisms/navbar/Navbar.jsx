import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MyButton } from "../../atoms";
import { Menu, Search, X } from "lucide-react";
import NavbarDropdown from "./NavbarDropdown";

import avaProfile from "/src/assets/background/ava-profile.png";
import logoBlue from "/src/assets/icons/logo/tickitz-logo-blue.svg";
import { useSelector } from "react-redux";

const Navbar = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const { user, role } = useSelector((state) => state.auth);

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (role === "user") {
      setIsLoggedIn(true);
      setIsAdminLoggedIn(false);
    } else if (role === "admin") {
      setIsAdminLoggedIn(true);
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(false);
      setIsAdminLoggedIn(false);
    }
  }, [role]);

  return (
    <header
      className="relative z-50 bg-white shadow-md"
      onClick={() => setIsMenuOpen(false)}
    >
      <div className="mx-auto max-w-screen-2xl p-5 lg:p-10">
        <div className="flex items-center justify-between">
          <img src={logoBlue} alt="Tickitz Logo" />

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-5 lg:flex">
            <Link className="hover:text-blue-800" to="/">
              Home
            </Link>
            {isAdminLoggedIn ? (
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
              </>
            )}
          </nav>

          {/* Desktop isLoggedin */}
          <div className="hidden items-center gap-5 lg:flex">
            {isLoggedIn || isAdminLoggedIn ? (
              <div className="flex items-center gap-5">
                <span className="text-sm">Hello, {user}</span>
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
            checkUserLogin={isLoggedIn}
            checkAdminLogin={isAdminLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setIsAdminLoggedIn={setIsAdminLoggedIn}
            dataUser={user}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
