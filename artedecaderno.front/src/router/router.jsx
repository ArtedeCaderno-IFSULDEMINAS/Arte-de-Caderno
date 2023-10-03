import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "src/pages/not-found";
import Gallery from "src/pages/gallery";
import About from "src/pages/about";
import Checkup from "../pages/checkup";
import Login from "src/pages/login";
import CheckupSchool from "src/views/checkup/checkup-school";
import TwoFactor from "src/pages/two-factor";
import ProtectedRoute from "./protected-route";
import Dashboard from "src/pages/dashboard";

const Rotas = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/galeria" element={<Gallery />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/cadastrar" element={<Checkup />} />
      <Route path="/cadastrar/escola" element={<CheckupSchool />} />
      <Route path="/login" element={<Login />} />
      <Route path="/seguranca" element={<TwoFactor />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute Component={Dashboard} />}
      />
    </Routes>
  );
};

export default Rotas;
