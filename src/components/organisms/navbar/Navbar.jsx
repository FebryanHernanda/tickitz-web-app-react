import { useState } from "react";
import { Link } from "react-router-dom";
import { MyButton } from "../../atoms";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="flex justify-between items-center p-5 shadow-md">
        <img
          src="/src/assets/icons/logo/tickitz-logo-blue.svg"
          alt="Tickitz Logo"
        />
        <nav className={`lg:flex ${isMenuOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-row gap-5">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="#">Buy Tickets</Link>
            </li>
          </ul>
        </nav>

        <div className="gap-5 hidden lg:flex">
          <>
            <MyButton>Sign In</MyButton>
            <MyButton>Sign Up</MyButton>
          </>
        </div>
        <button className="flex lg:hidden" onClick={handleMenuToggle}>
          <Menu />
        </button>
      </header>
    </>
  );
};

export default Navbar;
