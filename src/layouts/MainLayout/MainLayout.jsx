import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../components/organisms";
import { useState } from "react";

const MainLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main onClick={() => setIsMenuOpen(false)}>
        <Outlet />
      </main>
      <div className="mx-auto max-w-screen-2xl">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
