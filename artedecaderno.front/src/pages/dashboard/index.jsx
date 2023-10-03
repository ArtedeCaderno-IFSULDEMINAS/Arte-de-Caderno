import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Navbar from "src/components/navbar";
import { professorRoutes } from "src/services/professorRoutes";
import { studentRoutes } from "src/services/studentRoutes";
import { ContentContainer, PageContainer } from "src/styles/sharedStyles";
import ProfessorDash from "src/views/dashboard/professor";

const Dashboard = () => {
  const access = Cookies.get("accessType");
  const id = Cookies.get("user");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const getProfessor = async () => {
    const a = await professorRoutes.getProfById(id);
    console.log(a);
    if (a) {
      setUser({
        ...user,
        id: a.user._id,
        name: a.user.name,
        date_of_birth: a.user.date_of_birth,
        cpf: a.user.cpf,
        email: a.user.email,
        password: a.user.password,
        cel: a.user.phone,
        cep: a.user.cep,
        city: a.user.city,
        state: a.user.state,
        schoolId: a.user.schoolId,
        studentsId: a.user.studentsId || null,
        drawsId: a.user.drawsId,
      });
    }
  };

  const getStudent = async () => {
    const a = await studentRoutes.getUserById(id);
    console.log(a);
    if (a) {
      setUser({
        ...user,
        id: a.user._id,
        name: a.user.name,
        date_of_birth: a.user.date_of_birth,
        cpf: a.user.cpf,
        email: a.user.email,
        password: a.user.password,
        cel: a.user.phone,
        cep: a.user.cep,
        city: a.user.city,
        state: a.user.state,
        schoolId: a.user.schoolId,
        studentsId: a.user.studentsId || null,
        drawsId: a.user.drawsId,
      });
    }
  };

  const getEvaluator = async () => {};

  const getAdmin = async () => {};

  useEffect(() => {
    document.title = "Arte de Caderno | Dashboard";
    if (access === "professor") {
      getProfessor();
    } else if (access === "student") {
      getStudent();
    } else if (access === "evaluator") {
      getEvaluator();
    } else {
      getAdmin();
    }
  }, []);

  return (
    <PageContainer>
      <Navbar currentPage={"Dashboard"} />
      <ContentContainer>
        {access === "professor" && <ProfessorDash user={user} />}
      </ContentContainer>
    </PageContainer>
  );
};

export default Dashboard;
