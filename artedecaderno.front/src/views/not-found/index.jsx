import {
  Button,
  Column,
  ContentContainer,
  PageContainer,
  Row,
  Text,
  Title,
} from "src/styles/sharedStyles";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import Navbar from "src/components/navbar";
import { fonts } from "src/styles/constants";
import { Link, useNavigate } from "react-router-dom";

const NotFoundView = () => {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const router = useNavigate();
  return (
    <PageContainer
      style={{ justifyContent: "flex-start", alignItems: "center" }}
    >
      <Navbar />
      <ContentContainer>
        <Row width={desktop ? "60%" : "90%"}>
          <Column
            width={desktop ? "70%" : "100%"}
            style={{ alignItems: "start" }}
          >
            <Title color={"black"} style={{fontSize: "60px"}} >Oops!</Title>
            <Text font={fonts.raleway} size={"30px"} align={"left"}>
              A página que está procurando está em manutenção ou não existe.
            </Text>
            <Row style={{ marginTop: "1rem" }}>
              <Link to="/galeria" replace style={{ textDecoration: "none" }}>
                <Button>acesse a galeria</Button>
              </Link>
              <Button
                onClick={() => {
                  router(-1);
                }}
              >
                voltar para o site
              </Button>
            </Row>
          </Column>
          {desktop && (
            <Column width={desktop ? "30%" : "100%"}>
              <Title
                color="black"
                style={{
                  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  fontSize: "200px",
                }}
              >
                4
              </Title>
              <Title
                color="black"
                style={{
                  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  fontSize: "200px",
                }}
              >
                0
              </Title>
              <Title
                color="black"
                style={{
                  textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  fontSize: "200px",
                }}
              >
                4
              </Title>
            </Column>
          )}
        </Row>
      </ContentContainer>
    </PageContainer>
  );
};

export default NotFoundView;
