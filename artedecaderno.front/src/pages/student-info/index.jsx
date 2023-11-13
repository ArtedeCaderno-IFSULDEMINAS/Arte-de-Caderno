import Cookies from "js-cookie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StudentInfoView from "src/views/student-info";

const StudentInfo = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if(Cookies.get("access") !== "professor") {
      navigate("/dashboard");
    }
      window.title = "Arte de Caderno | Estudante";
  }, []);
  return <StudentInfoView />;
};

export default StudentInfo;
