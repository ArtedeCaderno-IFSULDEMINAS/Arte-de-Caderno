import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentsView from "src/views/students";

const Students = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Arte de Caderno | Meus alunos ";
    if (Cookies.get("accessType") !== "professor") {
      navigate("/dashboard");
    }
  }, []);
  return <StudentsView />;
};

export default Students;
