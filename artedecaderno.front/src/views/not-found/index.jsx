import {
  Column,
  PageContainer,
  Row,
  Title,
  Text,
  Button,
} from "src/styles/sharedStyles";
import { Link } from "react-router-dom";
import { useMediaQuery } from "src/hooks/useMediaQuery";

const NotFoundView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");

  return (
    <PageContainer style={{ justifyContent: "center", alignItems: "center" }}>
      <Row width={desktop ? "70%" : "90%"}>
        <img src={require("src/assets/img/logos/gatorujo.png")} />
        <Column width={desktop ? "50%" : "100%"}>
          <Title color={"black"}>Ops!</Title>
          <Text>Esta página não existe!</Text>
          <Link to="/" style={{ textDecoration: "none", marginTop: "1rem" }}>
            <Button>Página Inicial</Button>
          </Link>
        </Column>
      </Row>
    </PageContainer>
  );
};

export default NotFoundView;
