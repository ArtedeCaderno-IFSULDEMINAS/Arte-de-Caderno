import { useMediaQuery } from "src/hooks/useMediaQuery";
import { colors } from "src/styles/constants";
import { Container, Row, Title } from "src/styles/sharedStyles";
import DashboardCard from "./components/card";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminDash = ({ user }) => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.accessType !== "admin") {
      navigate("/dashboard")
    }
  }, []);
  
  return (
    <Container width={desktop ? "70%" : "90%"} color={colors.lightGrey}>
      <Row style={{ marginBottom: "1rem" }}>
        <Title color={"black"}>Olá, {user?.name.trim()}!</Title>
      </Row>
      <Row gap={"1rem"}>
        <DashboardCard
          icon={"user_group"}
          title={"Avaliadores cadastrados"}
          desktop={desktop}
          path={`/avaliadores`}
        />
        <DashboardCard
          value={0}
          icon={"draw"}
          title={"Editar galeria"}
          desktop={desktop}
          path={`/galeria/editar`}
        />
      </Row>
      <Row gap={"1rem"}>
        <DashboardCard
          value={0}
          icon={"add_person"}
          title={"Cadastrar avaliador"}
          desktop={desktop}
          path={`/avaliadores/criar`}
        />
        <DashboardCard
          value={0}
          icon={"add_draw"}
          title={"Adicionar à galeria"}
          desktop={desktop}
          path={`/galeria/adicionar`}
        />
      </Row>
    </Container>
  );
};

export default AdminDash;
