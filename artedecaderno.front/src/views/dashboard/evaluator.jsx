import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { colors } from "src/styles/constants";
import { Container, Row, Title } from "src/styles/sharedStyles";
import DashboardCard from "./components/card";

const EvaluatorDash = ({ user }) => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.accessType !== "evaluator") {
      navigate("/dashboard");
    }
  }, []);

  return (
    <Container
      color={colors.lightGrey}
      width={desktop ? "70%" : "90%"}
    >
      <Row style={{ marginBottom: "1rem" }}>
        <Title color={"black"}>Olá, {user?.name.trim()}!</Title>
      </Row>
      <Row gap={"1rem"}>
        <DashboardCard
          desktop={desktop}
          icon={"draw"}
          title={"Meus desenhos"}
          path={`/desenhos`}

        />
        <DashboardCard
          desktop={desktop}
          icon={"clock"}
          title={"Aguardando avaliação"}
          path={`/aguardando`}
          
        />

      </Row>
    </Container>
  );
};

export default EvaluatorDash;
