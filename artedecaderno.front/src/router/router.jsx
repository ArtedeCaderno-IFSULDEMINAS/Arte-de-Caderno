import { Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "src/pages/not-found";
import Gallery from "src/pages/gallery";
import About from "src/pages/about";

const Rotas = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/galeria" element={<Gallery />} />
      <Route path="/sobre" element={<About />} />
    </Routes>
  );
};

export default Rotas;
