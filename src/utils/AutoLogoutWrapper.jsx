import React from "react";
import { useTokenAutoLogout } from "../hooks";

const AutoLogoutWrapper = ({ children }) => {
  useTokenAutoLogout();

  return <>{children}</>;
};

export default AutoLogoutWrapper;
