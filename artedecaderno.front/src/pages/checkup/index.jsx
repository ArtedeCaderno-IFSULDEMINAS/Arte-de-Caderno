import { useEffect } from "react";
import CheckupView from "src/views/checkup";

const Checkup = () => {

  useEffect(() => {
    document.title = "Arte de Caderno | Cadastro";
  }, []);

  return <CheckupView/>
};

export default Checkup;
