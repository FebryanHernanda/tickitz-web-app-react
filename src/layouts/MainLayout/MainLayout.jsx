import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../components/organisms";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
