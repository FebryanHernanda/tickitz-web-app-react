import { useState } from "react";
import { ResetPasswordContext } from "./ResetPasswordContext";

const ResetPasswordProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <ResetPasswordContext.Provider value={{ userId, setUserId }}>
      {children}
    </ResetPasswordContext.Provider>
  );
};

export default ResetPasswordProvider;
