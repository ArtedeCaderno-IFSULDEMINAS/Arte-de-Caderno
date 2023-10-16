import { useEffect } from "react";
import StudentsView from "src/views/students";

const Students = () => {
  useEffect(() => {
    document.title = "Arte de Caderno | Meus alunos ";
  }, []);
  return <StudentsView />;
};

export default Students;
