import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Banner } from "src/components/banner";
import Navbar from "src/components/navbar";
import PreviousArrow from "src/components/previous-arrow";
import { userContext } from "src/contexts/userContext";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { loginRoutes } from "src/services/loginRoutes";
import {
  BodyLink,
  Button,
  Column,
  Container,
  ContentContainer,
  Input,
  PageContainer,
  Row,
  Text,
  Title,
} from "src/styles/sharedStyles";
import { throwToast } from "src/utils/toast";

const TwoFactorView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const { user } = useContext(userContext);
  const [code, setCode] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const logar = async () => {
    const a = await loginRoutes.logar(user.cpf, user.password, code);
    if (a) {
      throwToast.success("Verificação concluída!");
      setRedirect(true);
    }
  };

  return (
    <PageContainer>
      <Navbar />
      {redirect && <Navigate to="/dashboard" replace />}
      <ContentContainer>
        <Banner img={require("src/assets/img/login/background.png")}>
          <Column style={{ gap: "1rem" }}>
            <Container width={desktop ? "60%" : "90%"}>
              <Title color={"black"}>Autenticação em Dois Fatores</Title>
              <Text>
                Para continuar, insira abaixo o código enviado ao seu e-mail.
              </Text>
              <Row width={desktop ? "70%" : "100%"}>
                <Input
                  value={user.twoF}
                  onChange={(e) => setCode(e.target.value)}
                  onPaste={(e) => setCode(e.target.value)}
                />
                <Button onClick={logar}>enviar</Button>
              </Row>
              <BodyLink>Reenviar código</BodyLink>
            </Container>
            <PreviousArrow width={desktop ? "60%" : "90%"} />
          </Column>
        </Banner>
      </ContentContainer>
    </PageContainer>
  );
};

export default TwoFactorView;
