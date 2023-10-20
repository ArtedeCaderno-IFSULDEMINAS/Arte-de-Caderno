import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "src/components/navbar";
import PasswordModal from "src/components/password-modal";
import { userContext } from "src/contexts/userContext";
import singUpValidation from "src/hooks/signUpValidation";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { CEProutes } from "src/services/CEProutes";
import { CPFroutes } from "src/services/CPFroutes";
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
  Text,
  Title
} from "src/styles/sharedStyles";
import { checkPassword } from "src/utils/checkPassword";
import { format } from "src/utils/format";
import { throwToast } from "src/utils/toast";

const CheckupView = () => {
  const desktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate()
  const [desabilitado, setDesabilitado] = useState({ rua: true, number: true });
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user, setUser } = useContext(userContext);
  const [auxPwd, setAuxPwd] = useState({ pwd1: null, pwd2: null });
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState([]);
  const [aux, setAux] = useState({});

  const handleCpf = (e) => {
    const { value } = e.target;
    setAux((aux) => ({
      ...aux,
      cpf: format.cpf(value),
    }));
  };

  const handleCel = (e) => {
    const { value } = e.target;
    setUser((user) => ({
      ...user,
      cel: format.cel(value),
    }));
  };

  const handleCep = (e) => {
    const { value } = e.target;
    setUser((user) => ({
      ...user,
      cep: format.cep(value),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const checkPwd = () => {
    const a = checkPassword(auxPwd);
    console.log(auxPwd.pwd1);
    if (!a) {
      throwToast.error("As senhas devem ser idênticas");
    } else {
      setUser((user) => ({
        ...user,
        password: auxPwd.pwd1,
      }));
    }
  };

  const getCep = async () => {
    const a = await CEProutes.viacep(user.cep);
    if (a) {
      if (!a.logradouro || !a.bairro) {
        setDesabilitado((desabilitado) => ({
          ...desabilitado,
          bairro: false,
          number: false,
        }));
        setUser((user) => ({
          ...user,
          cep: a.cep,
          city: a.localidade,
          uf: a.uf,
          bairro: "",
          rua: "",
        }));
      } else {
        setDesabilitado((desabilitado) => ({
          ...desabilitado,
          bairro: true,
          number: false,
        }));
        setUser((user) => ({
          ...user,
          cep: a.cep,
          rua: a.logradouro,
          bairro: a.bairro,
          city: a.localidade,
          uf: a.uf,
        }));
      }
      setError({ ...error, cep: false });
    }
  };

  const checkCpf = async () => {
    const a = await CPFroutes.verifyCPF(aux.cpf);
    if (!a) {
      return
    } else {
      setUser((user) => ({ ...user, cpf: aux.cpf }));
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
    const err = singUpValidation(user);
    console.log(user);

    if (Object.keys(err).length === 0) {
      setRedirect(true);
      console.log(redirect);
    } else {
      throwToast.error(err[0]);
      console.log(err);
    }
  };

  return (
    <PageContainer>
      <Navbar />
      <ContentContainer
        style={{
          padding: desktop ? "0" : "1rem 0",
        }}
      >
        <Title color={colors.black} style={{ fontWeight: 500 }}>
          Cadastro de usuários
        </Title>
        <Container
          color={colors.grey}
          width={desktop ? "60%" : "90%"}
          style={{
            marginBottom: desktop ? "0" : "1rem",
          }}
        >
          <Form onSubmit={nextPage}>
            <Row>
              <Text>Dados Pessoais</Text>
            </Row>
            <Row gap={"1rem"}>
              <InputColumn width={desktop ? "60%" : "100%"}>
                <Label>Nome Completo:</Label>
                <Input
                  required
                  name="name"
                  onChange={handleChange}
                  value={user.name}
                />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>Data de Nascimento:</Label>
                <Input
                  required
                  name="date_of_birth"
                  onChange={handleChange}
                  value={user.date_of_birth}
                  type="date"
                />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>Perfil:</Label>
                <Select required name="perfil" onChange={handleChange}>
                  {!user.perfil && <Option value={null}>Selecione...</Option>}
                  <Option value="professor">Educador(a)</Option>
                  <Option value="student">Estudante</Option>
                </Select>
              </InputColumn>
            </Row>
            <Row gap={"1rem"}>
              <InputColumn width={desktop ? "33%" : "100%"}>
                <Label>CPF:</Label>
                <Input
                  required
                  name="cpf"
                  onChange={handleCpf}
                  value={aux.cpf}
                  onBlur={checkCpf}
                />
              </InputColumn>
              <InputColumn width={desktop ? "33%" : "100%"}>
                <Label>Celular:</Label>
                <Input
                  required
                  name="cel"
                  onChange={handleCel}
                  value={user.cel}
                />
              </InputColumn>
              <InputColumn width={desktop ? "33%" : "100%"}>
                <Label>CEP:</Label>
                <Input
                  required
                  name="cep"
                  onChange={handleCep}
                  value={user.cep}
                  onBlur={getCep}
                />
              </InputColumn>
            </Row>
            <Row gap={"1rem"}>
              <InputColumn width={desktop ? "60%" : "100%"}>
                <Label>Rua:</Label>
                <Input
                  required
                  disabled={desabilitado.rua}
                  value={user.rua}
                  onChange={handleChange}
                  name="rua"
                />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>Número:</Label>
                <Input
                  required
                  disabled={desabilitado.number}
                  name="numero"
                  onChange={handleChange}
                  value={user.number}
                />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>Complemento:</Label>
                <Input
                  disabled={desabilitado.number}
                  name="complemento"
                  onChange={handleChange}
                  value={user.complemento}
                />
              </InputColumn>
            </Row>
            <Row gap={"1rem"}>
              <InputColumn width={desktop ? "40%" : "100%"}>
                <Label>Bairro:</Label>
                <Input
                  required
                  disabled={desabilitado.rua}
                  name="bairro"
                  onChange={handleChange}
                  value={user.bairro}
                />
              </InputColumn>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Cidade:</Label>
                <Input
                  disabled
                  name="city"
                  onChange={handleChange}
                  value={user.city}
                />
              </InputColumn>
              <InputColumn width={desktop ? "10%" : "100%"}>
                <Label>UF:</Label>
                <Input
                  disabled
                  name="uf"
                  onChange={handleChange}
                  value={user.uf}
                />
              </InputColumn>
            </Row>
            <Row gap={"1rem"}>
              <InputColumn>
                <Label>E-mail:</Label>
                <Input
                  type="email"
                  required
                  name="email"
                  onChange={handleChange}
                  value={user.email}
                />
              </InputColumn>
            </Row>
            <Row gap={"1rem"}>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Senha:</Label>
                <Row style={{ flexDirection: "row" }}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={auxPwd.pwd1}
                    onChange={(e) => {
                      setAuxPwd((auxPwd) => ({
                        ...auxPwd,
                        pwd1: e.target.value,
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
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Confirmar Senha:</Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  value={auxPwd.pwd2}
                  onChange={(e) => {
                    setAuxPwd((auxPwd) => ({
                      ...auxPwd,
                      pwd2: e.target.value,
                    }));
                  }}
                  onBlur={checkPwd}
                />
              </InputColumn>
            </Row>
            <Button type="submit">próximo</Button>
          </Form>
        </Container>
        <BodyLink
          style={{ textDecoration: "underline" }}
          onClick={() => {
            navigate("/dicas-de-seguranca")
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
