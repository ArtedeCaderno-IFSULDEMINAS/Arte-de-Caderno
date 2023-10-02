import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Navbar from "src/components/navbar";
import PasswordModal from "src/components/password-modal";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { colors } from "src/styles/constants";
import {
  BodyLink,
  Button,
  Container,
  ContentContainer,
  Form,
  Input,
  InputColumn,
  Label,
  Option,
  PageContainer,
  Row,
  Select,
  Title,
} from "src/styles/sharedStyles";

const CheckupView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const [disabled, setDisabled] = useState({ rua: true, numero: true });
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer>
        <Title color={colors.black} style={{ fontWeight: 500 }}>
          Cadastro de usuários
        </Title>
        <Container color={colors.grey} width={desktop ? "60%" : "90%"}>
          <Form>
            <Row gap={"1rem"}>
              <InputColumn width={desktop ? "60%" : "100%"}>
                <Label>Nome Completo:</Label>
                <Input required />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>Data de Nascimento:</Label>
                <Input required />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>Perfil:</Label>
                <Select required>
                  <Option disabled>Selecione...</Option>
                  <Option value="professor">Educador(a)</Option>
                  <Option value="student">Estudante</Option>
                </Select>
              </InputColumn>
            </Row>
            <Row gap={"1rem"}>
              <InputColumn width={desktop ? "33%" : "100%"}>
                <Label>CPF:</Label>
                <Input required />
              </InputColumn>
              <InputColumn width={desktop ? "33%" : "100%"}>
                <Label>Telefone:</Label>
                <Input required />
              </InputColumn>
              <InputColumn width={desktop ? "33%" : "100%"}>
                <Label>CEP:</Label>
                <Input required />
              </InputColumn>
            </Row>
            <Row gap={"1rem"}>
              <InputColumn width={desktop ? "60%" : "100%"}>
                <Label>Rua:</Label>
                <Input required disabled={disabled.rua} />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>Número:</Label>
                <Input required disabled={disabled.numero} />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>Complemento:</Label>
                <Input disabled={disabled.numero} />
              </InputColumn>
            </Row>
            <Row gap={"1rem"}>
              <InputColumn width={desktop ? "40%" : "100%"}>
                <Label>Bairro:</Label>
                <Input required disabled={disabled.rua} />
              </InputColumn>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Cidade:</Label>
                <Input disabled />
              </InputColumn>
              <InputColumn width={desktop ? "10%" : "100%"}>
                <Label>UF:</Label>
                <Input disabled />
              </InputColumn>
            </Row>
            <Row gap={"1rem"}>
              <InputColumn>
                <Label>E-mail:</Label>
                <Input required />
              </InputColumn>
            </Row>
            <Row gap={"1rem"}>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Senha:</Label>
                <Row>
                  <Input type={showPassword ? "text" : "password"} required />
                  <Button
                    type="button"
                    width={"auto"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </Button>
                </Row>
              </InputColumn>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Confirmar Senha:</Label>
                <Input type={showPassword ? "text" : "password"} required />
              </InputColumn>
            </Row>

            <Button type="submit">próximo</Button>
          </Form>
        </Container>
        <BodyLink
          style={{ textDecoration: "underline" }}
          onClick={() => {
            setShowModal(true);
          }}
        >
          Como criar senhas fortes?
        </BodyLink>
      </ContentContainer>
      {showModal && <PasswordModal />}
    </PageContainer>
  );
};

export default CheckupView;
