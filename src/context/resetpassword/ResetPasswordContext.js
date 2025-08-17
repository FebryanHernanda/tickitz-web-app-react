import { createContext, useContext } from "react";

export const ResetPasswordContext = createContext();

const useResetPassword = () => useContext(ResetPasswordContext);

export default useResetPassword;
