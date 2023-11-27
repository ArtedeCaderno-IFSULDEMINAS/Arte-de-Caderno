import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Banner } from "src/components/banner";
import PreviousArrow from "src/components/previous-arrow";
import { userContext } from "src/contexts/userContext";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { loginRoutes } from "src/services/loginRoutes";
import Layout from "src/styles/layout";
import {
  BodyLink,
  Button,
  Column,
  Container,
  Input,
  Row,
  Text,
  Title
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

  const resend = async () => {
    const a = await loginRoutes.resend(user.cpf, user.password);
  };

  return (
    <Layout>
      {redirect && <Navigate to="/dashboard" replace />}
      <Banner img={require("src/assets/img/login/background.png")}>
        <Column style={{ gap: "1rem" }}>
          <Container width={desktop ? "60%" : "90%"}>
            <Title color={"black"}>Autenticação em Dois Fatores</Title>
            <Text>
              Para continuar, insira abaixo o código enviado ao seu e-mail.
            </Text>
            <Row
              width={desktop ? "30%" : "100%"}
              style={{ flexDirection: "row" }}
            >
              <Input
                value={user.twoF}
                onChange={(e) => setCode(e.target.value)}
                onPaste={(e) => setCode(e.target.value)}
                style={{ textTransform: "uppercase" }}
              />
              <Button onClick={logar}>enviar</Button>
            </Row>
            <BodyLink onClick={resend}>Reenviar código</BodyLink>
          </Container>
          <PreviousArrow width={desktop ? "60%" : "90%"} />
        </Column>
      </Banner>
    </Layout>
  );
};

export default TwoFactorView;
