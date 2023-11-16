import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Banner } from "src/components/banner";
import Navbar from "src/components/navbar";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { loginRoutes } from "src/services/loginRoutes";
import { icons } from "src/styles/icons";
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
import { checkPassword } from "src/utils/checkPassword";
import { format } from "src/utils/format";
import { throwToast } from "src/utils/toast";

const ResetPasswordView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();
  const [change, setChange] = useState({
    username: null,
    token: null,
    pwd: null,
  });
  const [ok, setOk] = useState(false);
  const [auxPwd, setAuxPwd] = useState({ pwd1: null, pwd2: null });
  const [showPwd, setShowPwd] = useState(false);

  const handleCPF = (e) => {
    const { value } = e.target;
    setChange({ ...change, username: format.cpf(value) });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setChange({ ...change, token: value });
  };

  const sendMail = async (e) => {
    e.preventDefault();
    const cpf = change.username.replace(/\D/g, "");
    const a = await loginRoutes.forgotPassword(cpf);
    if (a) {
      setOk(true);
    }
  };

  const checkPwd = () => {
    const a = checkPassword(auxPwd);
    if (a) {
      setChange({ ...change, pwd: auxPwd.pwd1 });
    }
  };

  const reset = async () => {
    const cpf = change.username.replace(/\D/g, "");
    let a;
    if (change.pwd === null) {
      throwToast.warning("Insira e confirme sua nova senha atendendo aos critérios de segurança.");
      return;
    }

    a = await loginRoutes.resetPassword(change);

    if (a) {
      navigate("/login");
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <Banner img={require("src/assets/img/login/background.png")}>
          <Container width={desktop ? "30%" : "90%"}>
            <Title color="black">Recuperar Senha</Title>
            <Text style={{ textAlign: "center" }}>
              Insira o CPF cadastrado:
            </Text>
            <Form>
              <Row style={{ flexDirection: "row", alignItems: "end" }}>
                <InputColumn>
                  <Label>CPF:</Label>
                  <Input
                    type="text"
                    onChange={handleCPF}
                    required
                    value={change.username}
                    disabled={ok}
                  />
                </InputColumn>
                <Button
                  type="submit"
                  style={{ margin: 0, display: ok ? "none" : "block" }}
                  onClick={sendMail}
                >
                  Enviar
                </Button>
              </Row>
              {ok && (
                <>
                  <Row>
                    <InputColumn>
                      <Label>Código enviado:</Label>
                      <Input
                        type="text"
                        onChange={handleChange}
                        onPaste={handleChange}
                        required
                        value={change.token}
                      />
                    </InputColumn>
                  </Row>
                  <Row>
                    <InputColumn>
                      <Label>Nova senha:</Label>
                      <Row style={{ flexDirection: "row" }}>
                        <Input
                          type={showPwd ? "text" : "password"}
                          onChange={(e) =>
                            setAuxPwd({ ...auxPwd, pwd1: e.target.value })
                          }
                          required
                          value={auxPwd.pwd1}
                        />
                        <Button
                          width={"auto"}
                          type="button"
                          onClick={() => setShowPwd(!showPwd)}
                        >
                          <FontAwesomeIcon
                            icon={showPwd ? icons.eye_slash : icons.eye}
                          />
                        </Button>
                      </Row>
                    </InputColumn>
                  </Row>
                  <Row>
                    <InputColumn>
                      <Label>Confirmar nova senha:</Label>
                      <Input
                        type={showPwd ? "text" : "password"}
                        onChange={(e) =>
                          setAuxPwd({ ...auxPwd, pwd2: e.target.value })
                        }
                        required
                        value={auxPwd.pwd2}
                        onBlur={checkPwd}
                      />
                    </InputColumn>
                  </Row>
                  <BodyLink
                    style={{ textDecoration: "underline" }}
                    onClick={() => {
                      navigate("/dicas-de-seguranca");
                    }}
                  >
                    Como criar senhas fortes?
                  </BodyLink>
                  <Button type="button" width={"100%"} onClick={reset}>
                    Enviar
                  </Button>
                </>
              )}
            </Form>
          </Container>
        </Banner>
      </ContentContainer>
    </PageContainer>
  );
};

export default ResetPasswordView;
