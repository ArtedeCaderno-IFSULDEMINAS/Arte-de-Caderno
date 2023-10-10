import { useMediaQuery } from "src/hooks/useMediaQuery";
import { colors } from "src/styles/constants";
import { Container, Row, Title } from "src/styles/sharedStyles";
import DashboardCard from "./components/card";

const StudentDash = ({ user }) => {
  const desktop = useMediaQuery("(min-width: 768px)");

  return (
    <Container width={desktop ? "85%" : "90%"} color={colors.lightGrey}>
      <Row style={{ marginBottom: "1rem" }}>
        <Title color={"black"}>Olá, {user?.name}!</Title>
      </Row>
      <Row gap={"1rem"}>
        <DashboardCard
          value={0}
          icon={"draw"}
          title={"Desenhos cadastrados"}
          desktop={desktop}
          path={"#"}
        />
        <DashboardCard
          icon={"add_draw"}
          title={"Cadastrar novo desenho"}
          desktop={desktop}
          path={"/cadastrar-desenho"}
        />
      </Row>
    </Container>
  );
};

export default StudentDash;
