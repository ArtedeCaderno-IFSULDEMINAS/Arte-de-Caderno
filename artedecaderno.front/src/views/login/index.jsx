import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useContext, useState } from "react";
import { Banner } from "src/components/banner";
import Navbar from "src/components/navbar";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import {
  BodyLink,
  Button,
  Container,
  ContentContainer,
  Form,
  Input,
  InputColumn,
  Label,
  PageContainer,
  Row,
  Text,
  Title,
} from "src/styles/sharedStyles";
import { format } from "src/utils/format";
import { userContext } from "src/contexts/userContext";
import { Link, Navigate } from "react-router-dom";
import { socialMediaColors, colors } from "src/styles/constants";
import { loginRoutes } from "src/services/loginRoutes";

const LoginView = () => {
  const desktop = useMediaQuery("(min-width: 930px)");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { user, setUser } = useContext(userContext);
  const [credentials, setCredentials] = useState({
    cpf: null,
    password: null,
  });

  const handleCPF = (e) => {
    setCredentials((credentials) => ({
      ...credentials,
      cpf: format.cpf(e.target.value),
    }));
  };

  const login = async (e) => {
    e.preventDefault();
    console.log(credentials);
    const a = await loginRoutes.login(credentials.cpf, credentials.password);
    if (a) {
      setUser({
        ...user,
        cpf: credentials.cpf,
        password: credentials.password,
      });
      setRedirect(true);
    }
  };

  return (
    <PageContainer>
      {redirect && <Navigate to="/dashboard" replace />}
      <Navbar currentPage={"Login"} />
      <ContentContainer>
        <Banner img={require("src/assets/img/login/background.png")}>
          <Container width={desktop ? "30%" : "90%"}>
            <Title color={"black"}>Bem-vindo(a)!</Title>
            <Text style={{ textAlign: "center" }}>
              Entre com a sua conta para acessar nossa plataforma.
            </Text>
            <Form onSubmit={login}>
              <InputColumn width={desktop ? "80%" : "100%"}>
                <Label>CPF:</Label>
                <Input value={credentials.cpf} onChange={handleCPF} required />
              </InputColumn>
              <InputColumn width={desktop ? "80%" : "100%"}>
                <Label>Senha:</Label>
                <Row style={{ flexDirection: "row" }}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={(e) => {
                      setCredentials((credentials) => ({
                        ...credentials,
                        password: e.target.value,
                      }));
                    }}
                  />
                  <Button
                    type="button"
                    width={"auto"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </Button>
                </Row>
              </InputColumn>
              <Link
                to={"/esqueci-senha"}
                style={{ textDecorationColor: "black" }}
              >
                <BodyLink>Esqueci minha senha</BodyLink>
              </Link>
              <Button
                width={desktop ? "80%" : "100%"}
                bg={colors.darkGrey}
                hover={colors.grey}
                color="black"
                textTransform={"capitalize"}
                style={{ fontWeight: 800 }}
              >
                Entrar
              </Button>
              <Button
                width={desktop ? "80%" : "100%"}
                bg={socialMediaColors.facebook}
                hover={socialMediaColors.hFacebook}
                color={colors.white}
                textTransform={"none"}
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  style={{ fontSize: "16px", marginRight: "5px" }}
                />
                Entrar com Facebook
              </Button>
              <Button
                width={desktop ? "80%" : "100%"}
                bg={socialMediaColors.google}
                hover={socialMediaColors.hGoogle}
                color={colors.white}
                textTransform={"none"}
              >
                <FontAwesomeIcon
                  icon={faGoogle}
                  style={{ fontSize: "16px", marginRight: "5px" }}
                />{" "}
                Entrar com Google
              </Button>
            </Form>
            <Text style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              Não tem uma conta?{" "}
              <Link to="/cadastrar" style={{ textDecorationColor: "black" }}>
                <BodyLink> Cadastre-se</BodyLink>
              </Link>{" "}
            </Text>
          </Container>
        </Banner>
      </ContentContainer>
    </PageContainer>
  );
};

export default LoginView;
