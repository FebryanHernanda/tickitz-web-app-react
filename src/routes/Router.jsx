import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoviesPages } from "../components/pages";
import { MainLayout } from "../layouts";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          "<Route path="/" element={<MoviesPages />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
