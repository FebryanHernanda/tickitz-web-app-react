import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AdminDashboard,
  AdminData,
  AdminMovieForm,
  LandingPages,
  LoginPages,
  MoviesDetailsPages,
  MoviesPages,
  OrderPages,
  PaymentPages,
  ProfilePages,
  RegisterPages,
  ResultsPages,
} from "../components/pages";
import { AuthLayout, MainLayout } from "../layouts";

import PrivateRoutes from "./PrivateRoutes";
import { ToastContainer } from "react-toastify";
// query params
// paginations

function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<LandingPages />}></Route>

            {/* Movies */}
            <Route path="movies">
              <Route index element={<MoviesPages />}></Route>
              <Route
                path="details/:movieId"
                element={<MoviesDetailsPages />}
              ></Route>
            </Route>
            {/* Movies */}

            {/* Admin */}
            <Route path="admin">
              <Route index element={<AdminDashboard />}></Route>
              <Route path="data" element={<AdminData />}></Route>
              <Route path="data/add-movie" element={<AdminMovieForm />}></Route>
            </Route>
            {/* Admin */}

            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
              <Route path="payment">
                <Route index element={<PaymentPages />}></Route>
                <Route path="results" element={<ResultsPages />}></Route>
              </Route>

              <Route path="order" element={<OrderPages />}></Route>

              <Route path="profile">
                <Route index element={<ProfilePages />}></Route>
              </Route>
            </Route>
            {/* Private Routes */}
          </Route>

          <Route path="auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPages />}></Route>
            <Route path="register" element={<RegisterPages />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default Router;
