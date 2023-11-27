import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InsertEvaluatorView from "src/views/admin/insert-evaluator";

const InsertEvaluator = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.title = "Arte de Caderno | Cadastrar avaliador";
    if (Cookies.get("access" !== "admin")) {
      navigate("/dashboard");
    }
  }, []);
  return <InsertEvaluatorView/>
};

export default InsertEvaluator;
