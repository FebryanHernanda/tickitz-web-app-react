import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPages, MoviesPages, PaymentPages } from "../components/pages";
import { MainLayout } from "../layouts";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPages />}></Route>
          <Route path="/movies" element={<MoviesPages />}></Route>
          <Route path="/payment" element={<PaymentPages />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
