import { useEffect } from "react";
import DrawSubmitView from "src/views/draw-submit";

const DrawSubmit = () => {
  useEffect(() => {
    document.title = "Arte de Caderno | Cadastrar Obra";
  }, []);
  return <DrawSubmitView />;
};

export default DrawSubmit;
