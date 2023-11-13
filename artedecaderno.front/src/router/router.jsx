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
import DrawSubmit from "src/pages/draw-submit";
import CheckupStudent from "src/pages/checkup/checkup-student";
import Students from "src/pages/students";
import Profile from "src/pages/profile";
import EditProfileView from "src/views/profile/edit-profile";
import PasswordTip from "src/views/checkup/password-tip";
import CheckupNewSchool from "src/pages/checkup/checkup-new-school";

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
      <Route path="/dicas-de-seguranca" element={<PasswordTip />} />

      <Route
        path="/dashboard"
        element={<ProtectedRoute Component={Dashboard} />}
      />
      <Route
        path="/cadastrar-desenho"
        element={<ProtectedRoute Component={DrawSubmit} />}
      />
      <Route
        path="/cadastrar-estudante"
        element={<ProtectedRoute Component={CheckupStudent} />}
      />
      <Route
        path="/meus-alunos"
        element={<ProtectedRoute Component={Students} />}
      />
      <Route path="/perfil" element={<ProtectedRoute Component={Profile} />} />
      <Route
        path="/perfil/editar"
        element={<ProtectedRoute Component={EditProfileView} />}
      />
      <Route
        path="/escolas/nova" 
        element={<ProtectedRoute Component={CheckupNewSchool}/>}
      />
    </Routes>
  );
};

export default Rotas;
