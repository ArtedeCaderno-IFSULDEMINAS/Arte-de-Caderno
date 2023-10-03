import { useMediaQuery } from "src/hooks/useMediaQuery";
import { Container, Row, Title } from "src/styles/sharedStyles";

const ProfessorDash = ({ user }) => {
  const desktop = useMediaQuery("(min-width: 768px)");
  return (
    <Container width={desktop ? "60%" : "90%"}>
      <Row>
        <Title color={"black"}>Olá, {user?.name}!</Title>
      </Row>
    </Container>
  );
};

export default ProfessorDash;
