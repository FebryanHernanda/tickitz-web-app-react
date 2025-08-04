import { Outlet } from "react-router-dom";

import heroBg from "/src/assets/background/background.png";
import ticketLogoWhite from "/src/assets/icons/logo/tickitz-logo-white.svg";

const AuthLayout = () => {
  return (
    <>
      <div
        className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-cover bg-center bg-no-repeat p-5 lg:p-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3)), url(${heroBg})`,
        }}
      >
        <img src={ticketLogoWhite} alt="Tickitz Logo" className="w-100" />
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
