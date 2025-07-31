import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LandingPages,
  LoginPages,
  MoviesPages,
  PaymentPages,
  RegisterPages,
} from "../components/pages";
import { AuthLayout, MainLayout } from "../layouts";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPages />}></Route>
          <Route path="movies" element={<MoviesPages />}></Route>
          <Route path="payment" element={<PaymentPages />}></Route>
        </Route>

        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPages />}></Route>
          <Route path="register" element={<RegisterPages />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
