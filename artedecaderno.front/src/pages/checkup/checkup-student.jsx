import { useEffect } from "react";

const {
  default: CheckupStudentView,
} = require("src/views/checkup/checkup-student");

const CheckupStudent = () => {
  useEffect(() => {
    document.title = "Arte de Caderno | Cadastrar Estudante";
  }, []);
  return <CheckupStudentView />;
};

export default CheckupStudent;
