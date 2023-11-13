import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "src/components/navbar";
import PreviousArrow from "src/components/previous-arrow";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import { CEProutes } from "src/services/CEProutes";
import { schoolRoutes } from "src/services/schoolRoutes";
import { colors } from "src/styles/constants";
import { icons } from "src/styles/icons";
import {
  Button,
  Container,
  ContentContainer,
  Form,
  Input,
  InputColumn,
  Label,
  PageContainer,
  Row,
  Title,
} from "src/styles/sharedStyles";
import { format } from "src/utils/format";

const CheckupNewSchoolView = () => {
  const desktop = useMediaQuery("(min-width: 800px)");
  const [redirect, setRedirect] = useState(false);

  const [desabilitado, setDesabilitado] = useState({
    bairro: true,
    number: true,
  });
  const [newSchool, setNewSchool] = useState({
    name: null,
    cep: null,
    rua: null,
    numero: null,
    bairro: null,
    city: null,
    uf: null,
    inep: null,
    email: null,
    phone: null,
    site: null,
  });

  const changeInep = (e) => {
    e.preventDefault();
    setNewSchool({ ...newSchool, inep: format.inep(e.target.value) });
  };

  const setCep = (e) => {
    e.preventDefault();
    setNewSchool({ ...newSchool, cep: format.cep(e.target.value) });
  };

  const setPhone = (e) => {
    e.preventDefault();
    setNewSchool({ ...newSchool, phone: format.phone(e.target.value) });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSchool({ ...newSchool, [name]: value });
  };

  const viacep = async () => {
    const a = await CEProutes.viacep(newSchool.cep);
    if (a) {
      if (!a.logradouro || !a.bairro) {
        setDesabilitado((desabilitado) => ({
          ...desabilitado,
          bairro: false,
          number: false,
        }));
        setNewSchool((school) => ({
          ...school,
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
        setNewSchool((school) => ({
          ...school,
          cep: a.cep,
          rua: a.logradouro,
          bairro: a.bairro,
          city: a.localidade,
          uf: a.uf,
        }));
      }
    } else {
      newSchool.cep = null;
      newSchool.city = null;
      newSchool.uf = null;
      newSchool.bairro = null;
      newSchool.rua = null;
      setNewSchool((newSchool) => ({
        ...newSchool,
      }));
    }
  };

  const insertSchool = async (e) => {
    e.preventDefault();
    console.log(newSchool);
    const a = await schoolRoutes.insertSchool(newSchool);
    if (a) {
      setRedirect(true);
    }
  };

  return (
    <PageContainer>
      {redirect && <Navigate to="/dashboard" />}
      <Navbar />
      <ContentContainer>
        <Title color="black">Cadastrar Escola</Title>
        <Container color={colors.lightGrey} width={desktop ? "60%" : "90%"}>
          <Form onSubmit={insertSchool} >
            <Row>
              <InputColumn width={desktop ? "85%" : "100%"}>
                <Label>Nome da Escola:</Label>
                <Input
                  name="name"
                  value={newSchool.name}
                  onChange={handleChange}
                  required
                />
              </InputColumn>
              <InputColumn width={desktop ? "15%" : "100%"}>
                <Label>
                  <a
                    href="https://inepdata.inep.gov.br/analytics/saw.dll?Dashboard&NQUser=inepdata&NQPassword=Inep2014&PortalPath=%2Fshared%2FCenso%20da%20Educa%C3%A7%C3%A3o%20B%C3%A1sica%2F_portal%2FCat%C3%A1logo%20de%20Escolas&Page=Pr%C3%A9-Lista%20das%20Escolas"
                    target="_blank"
                    style={{
                      color: "black",
                    }}
                  >
                    Código INEP:
                  </a>
                </Label>
                <Input
                  name="inep"
                  value={newSchool.inep}
                  onChange={changeInep}
                  required
                />
              </InputColumn>
            </Row>
            <Row>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>CEP:</Label>
                <Row>
                  <Input name="cep" value={newSchool.cep} onChange={setCep} required />
                  <Button type="button" width={"auto"} onClick={viacep}>
                    <FontAwesomeIcon icon={icons.cep} />
                  </Button>
                </Row>
              </InputColumn>
              <InputColumn width={desktop ? "60%" : "100%"}>
                <Label>Rua:</Label>
                <Input
                  name="rua"
                  disabled={desabilitado.bairro}
                  value={newSchool.rua}
                  onChange={handleChange}
                  required
                />
              </InputColumn>
              <InputColumn width={desktop ? "20%" : "100%"}>
                <Label>Número:</Label>
                <Input
                  name="numero"
                  disabled={desabilitado.number}
                  value={newSchool.numero}
                  onChange={handleChange}
                  required
                />
              </InputColumn>
            </Row>
            <Row>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Bairro:</Label>
                <Input
                  disabled={desabilitado.bairro}
                  name="bairro"
                  value={newSchool.bairro}
                  onChange={handleChange}
                  required
                />
              </InputColumn>
              <InputColumn width={desktop ? "40%" : "100%"}>
                <Label>Cidade:</Label>
                <Input disabled name="city" value={newSchool.city} required />
              </InputColumn>
              <InputColumn width={desktop ? "10%" : "100%"}>
                <Label>UF:</Label>
                <Input name="uf" disabled value={newSchool.uf} required />
              </InputColumn>
            </Row>
            <Row>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>E-mail:</Label>
                <Input
                  name="email"
                  value={newSchool.email}
                  onChange={handleChange}
                  required
                />
              </InputColumn>
              <InputColumn width={desktop ? "50%" : "100%"}>
                <Label>Telefone:</Label>
                <Input
                  name="phone"
                  value={newSchool.phone}
                  onChange={setPhone}
                  required
                />
              </InputColumn>
            </Row>
            <Row>
              <InputColumn width={"100%"}>
                <Label>Site:</Label>
                <Input
                  name="site"
                  value={newSchool.site}
                  onChange={handleChange}
                />
              </InputColumn>
            </Row>
          </Form>
          <Row>
            <Button type="button" width={"auto"} onClick={insertSchool} >
              Cadastrar
            </Button>
          </Row>
        </Container>
        <PreviousArrow width={desktop ? "60%" : "90%"} />
      </ContentContainer>
    </PageContainer>
  );
};

export default CheckupNewSchoolView;
