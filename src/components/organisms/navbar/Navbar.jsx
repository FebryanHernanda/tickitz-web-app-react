import { MyButton } from "../../atoms";

const Navbar = () => {
  return (
    <>
      <header className="flex justify-between items-center p-5 shadow-md">
        <img
          src="/src/assets/icons/logo/tickitz-logo-blue.svg"
          alt="Tickitz Logo"
        />
        <nav>
          <ul className="flex gap-5">
            <a href="#">
              <li>Home</li>
            </a>
            <a href="#">
              <li>Movie</li>
            </a>
            <a href="#">
              <li>Buy Ticket</li>
            </a>
          </ul>
        </nav>

        <div className="flex gap-5">
          <MyButton>Sign In</MyButton>
          <MyButton>Sign Up</MyButton>
        </div>
      </header>
    </>
  );
};
export default Navbar;
