import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <div
        className=" w-full min-h-screen bg-cover bg-center bg-no-repeat flex flex-col justify-center items-center gap-10 p-5 lg:p-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.3)), url(../src/assets/background/background.png)",
        }}
      >
        <img
          src="/src/assets/icons/logo/tickitz-logo-white.svg"
          alt="Tickitz Logo"
          className="w-100"
        />
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
