import { useMediaQuery } from "src/hooks/useMediaQuery";
import { colors } from "src/styles/constants";
import { Container, Row, Title } from "src/styles/sharedStyles";
import DashboardCard from "./components/card";

const ProfessorDash = ({ user }) => {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <Container width={desktop ? "85%" : "90%"} color={colors.lightGrey}>
      <Row style={{ marginBottom: "1rem" }}>
        <Title color={"black"}>Olá, {user?.name}!</Title>
      </Row>
      <Row gap={"1rem"}>
        <DashboardCard
          value={user.studentsId.length}
          icon={"user_group"}
          title={"Alunos cadastrados"}
          desktop={desktop}
          path={`/meus-alunos`}
        />
        <DashboardCard
          value={0}
          icon={"draw"}
          title={"Desenhos cadastrados"}
          desktop={desktop}
          path={"#"}
        />
        <DashboardCard
          value={0}
          icon={"book"}
          title={"Escolas cadastradas"}
          desktop={desktop}
          path={"#"}
        />
      </Row>
      <Row gap={"1rem"}>
        <DashboardCard
          icon={"add_person"}
          title={"Cadastrar novo aluno"}
          desktop={desktop}
          path={"/cadastrar-estudante"}
        />
        <DashboardCard
          icon={"add_draw"}
          title={"Cadastrar novo desenho"}
          desktop={desktop}
          path={"/cadastrar-desenho"}
        />
        <DashboardCard
          icon={"add_school"}
          title={"Cadastrar nova escola"}
          desktop={desktop}
          path={"/escolas/nova"}
        />
      </Row>
    </Container>
  );
};

export default ProfessorDash;
