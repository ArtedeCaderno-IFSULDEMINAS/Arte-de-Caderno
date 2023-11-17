import Cookies from "js-cookie";
import { useLayoutEffect, useState } from "react";
import Loading from "src/components/loading";
import Navbar from "src/components/navbar";
import { evaluatorRoutes } from "src/services/evaluatorRoutes";
import { professorRoutes } from "src/services/professorRoutes";
import { studentRoutes } from "src/services/studentRoutes";
import { ContentContainer, PageContainer } from "src/styles/sharedStyles";
import AdminDash from "src/views/dashboard/admin";
import EvaluatorDash from "src/views/dashboard/evaluator";
import ProfessorDash from "src/views/dashboard/professor";
import StudentDash from "src/views/dashboard/student";

const Dashboard = () => {
  const access = Cookies.get("accessType");
  const id = Cookies.get("user");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const getProfessor = async () => {
    const a = await professorRoutes.getProfById(id);
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
      setLoading(false);
    }
  };

  const getStudent = async () => {
    const a = await studentRoutes.getUserById(id);
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
      setLoading(false);
    }
  };

  const getEvaluator = async () => {
    const a = await evaluatorRoutes.getEvaluatorById(id);
    if (a) {
      setUser({
        ...user,
        id: a.user._id,
        name: a.user.name,
        cpf: a.user.cpf,
        email: a.user.email,
        draws: a.user.draws,
      });
      setLoading(false);
    }
  };

  const getAdmin = async () => {
    const a = await studentRoutes.getUserById(id);
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
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
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
  }, [loading]);

  if (loading) {
    return <Loading currentPage={"Dashboard"} />;
  } else {
    return (
      <PageContainer>
        <Navbar currentPage={"Dashboard"} />
        <ContentContainer>
          {access === "professor" && <ProfessorDash user={user} />}
          {access === "student" && <StudentDash user={user} />}
          {access === "admin" && <AdminDash user={user} />}
          {access === "evaluator" && <EvaluatorDash user={user} />}
        </ContentContainer>
      </PageContainer>
    );
  }
};

export default Dashboard;
