import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPages, MoviesPages } from "../components/pages";
import { MainLayout } from "../layouts";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPages />}></Route>
          <Route path="/movies" element={<MoviesPages />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
