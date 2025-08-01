import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../components/organisms";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <div className="mx-auto max-w-screen-2xl">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
